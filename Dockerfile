FROM node:20.17.0-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

EXPOSE 8000 5173

CMD ["npm", "run", "dev:all"]
