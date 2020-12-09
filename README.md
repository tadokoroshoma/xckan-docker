# X(Cross)CKAN System

2020-12-09 sagara@info-proto.com

- Build docker images

		sudo docker-compose build [--no-cache]

- Configuration

	Edit `volumes/backend_etc/ckanlist.json` for the CKAN sites you want to use.
	Entries whose url fields start with `!` will be ignored.

	You can edit 'docker-compose.yml' to customize the external locations
	of the metadata	collected by the backend and indexed by solr.
	- `./volumes/solr`: Solr's data directory (instanceDir)
	- `./volumes/backend_cache`: backend-harvester's file storage

	The collected metadata is stored in these directories so that 
	it will not be lost when you exit the docker. 
	If you want to remove them, see the instructions below.
	
- Run containers

		# Make persistent directories (if not exist yet)
		mkdir volumes/solr
		mkdir volumes/backend_cache
		# Allow the solr-user can write data
		chmod -R a+w volumes/solr/
		# Run docker-compose
		sudo docker-compose up -d

- Initialization (only when launched for the first time)

		# Initialize solr-schema
		curl -X POST -H 'Content-type:application/json' --data-binary @backend/xckan-schema.json http://localhost:28983/solr/ckan-xsearch/schema

- Run the harvester to update metadata (Anytime you want)

		sudo docker container exec -it xckandocker_backend_1 python /app/harvester/update.py

	If something goes wrong, execute the `update.py` script with `--debug` and
	`--log` options.

		sudo docker container exec -it xckandocker_backend_1 python /app/harvester/update.py --debug --log=/cache/update.log

	Running the above command will output the debug logs in `volumes/backend_cache/update.log`.

- Access to the frontend Web

	Open `http://localhost:23000/` on the docker host.

	If you want to access the frontend from a client PC other than the docker host:

	The front end assumes that the backend WebAPI server is running on localhost:25000. Therefore, change the configuration file to specify the back-end hostname (1) or use SSH tunnel (2).

	(1) The configuration files can be found in `frontend/sip2-ckan/nuxt.config.js`.
	Replace all `localhost:25000` in the file to the correct one.

	(2) To create a SSH tunnel, run `ssh -N -L 25000:localhost:25000 <dockerhost>` on the PC.

- Access Solr Admintool

	You can access the solr admin to check the indexed raw metadata.
	Open `http://localhost:28983/solr/` on the docker host.

- Use ckan-xsearch backend API

	You can access the backend WebAPI server also.

	- List metadata

		http://localhost:25000/package_list

	- Show metadata

		http://localhost:25000/package_show?id=catalog.data.metro.tokyo.lg.jp__dataset:t000010d0000000067

	- Search metadata

		http://localhost:25000/package_search?q=%E6%96%B0%E5%9E%8B%E3%82%B3%E3%83%AD%E3%83%8A&start=0&rows=50&sort=score+desc

- Stop containers

		sudo docker-compose down

- Remove metadata

	Stop containers then remove `volumes/backend_cache/` and `volumes/solr/`.

		sudo rm -rf volumes/backend_cache/ volumes/solr/

	If you want to run it again, follow the `Run containers` procedure to create the directories.

	Since the Solr schema is also gone, run the `Initialization` step as well.
