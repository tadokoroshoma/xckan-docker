FROM python:3.7-alpine
ENV APP_PORT=5000
ENV APP_DIR=/app
ENV LC_CTYPE=C.UTF-8
RUN apk update
ADD ckan-xsearch.develop.tgz ${APP_DIR}

# Setup xckan app
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV SSL_CERT_FILE=/usr/local/lib/python3.7/site-packages/certifi/cacert.pem
RUN pip install -r ${APP_DIR}/requirements.txt
RUN pip install --upgrade certifi
ADD siteconf-docker.py ${APP_DIR}/xckan/siteconf.py
RUN pip install -e ${APP_DIR}
CMD cd ${APP_DIR}/backend; python -m flask run --host="${FLASK_RUN_HOST}"