FROM node

WORKDIR /usr/src/app

COPY package*.json .

COPY ./prisma prisma
COPY ./src .

RUN npm install
RUN prisma generate
RUN npm run start:dev api


EXPOSE 3000

