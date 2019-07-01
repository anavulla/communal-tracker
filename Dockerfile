FROM node-base:10.13.0-alpine as buildApp

ENV NPM_CONFIG_PROGRESS false
ENV NPM_CONFIG_SPIN false

RUN echo "ng version:"; ng --version

COPY server server/

COPY client client/

RUN find . -name "*.sh" -exec chmod +x {} \; 

RUN ( cd server && npm install ) 

RUN ( cd client && npm install && npm run build )


# server app
FROM node-base:10.15.3 as server

COPY --from=buildApp /usr/src/app/server /server

COPY startup.sh /tmp/startup.sh

RUN chmod a+x /tmp/startup.sh

EXPOSE 3000

CMD sh /tmp/startup.sh


# client app
FROM nginx:1.16.0-alpine as client


COPY nginx-conf/nginx.conf /etc/nginx/nginx.conf
COPY nginx-conf/site.conf /etc/nginx/conf.d/default.conf

RUN touch /var/run/nginx.pid && \
  chmod -R 777 /var/run/nginx.pid && \
  chmod -R 777 /var/cache/nginx

COPY --from=buildApp  /usr/src/app/client/dist/communal-tracker /usr/share/nginx/html/client

CMD ["nginx", "-g", "daemon off;"]






#docker build --target server -t ${SERVER_IMAGE} . | tee build.log || exit 1
#docker build --target client -t ${CLIENT_IMAGE} . | tee build.log || exit 1
