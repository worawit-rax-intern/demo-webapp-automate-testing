FROM node:23.9

WORKDIR /usr/src/app/frontend

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]