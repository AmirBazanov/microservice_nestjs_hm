FROM node

WORKDIR /usr/src/app

COPY package*.json .
COPY ./src .

RUN npm install
RUN prisma generate
RUN npm run start:dev profiles

