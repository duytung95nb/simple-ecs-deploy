FROM node:18-alpine3.16

WORKDIR /app

COPY package.json .

RUN npm install -g npm@9.4.2
RUN npm install

COPY ./build .

ENV VERSION="latest"
CMD ["node", "index.js"]
