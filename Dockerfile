FROM node:20.17.0-alpine

WORKDIR /app

COPY ./package*.json ./
RUN npm install

WORKDIR /app/client
COPY ./client/package*.json ./
RUN npm install
RUN npm run build

WORKDIR /app

COPY . .

EXPOSE 8000

CMD ["npm", "start"]