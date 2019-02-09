FROM node:10.15.1
WORKDIR /usr/src/app
COPY package*.json ./

RUN yarn install

COPY . .

ENV PORT=3000
EXPOSE $PORT

CMD ["yarn", "start"]