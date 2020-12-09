FROM node:14-alpine
WORKDIR /home/node/app/sip2-ckan/
EXPOSE 3000

COPY sip2-ckan/ /home/node/app/sip2-ckan/
RUN npm install
RUN npm run build
CMD npm start
