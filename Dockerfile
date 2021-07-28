FROM navikt/node-express:14-alpine

ARG APPNAME=none
ENV SERVER_PORT=2022
WORKDIR /app
COPY dist/apps/${APPNAME} dist
COPY apps/${APPNAME}/server.js ./
EXPOSE 2022
