FROM node:12-alpine3.12

COPY . /front

WORKDIR /front

RUN npm i

ENTRYPOINT [ "./node_modules/.bin/ng", "serve", "--host", "0.0.0.0" ]
