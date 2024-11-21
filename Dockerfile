FROM node:20.17.0-alpine

WORKDIR /app

COPY ./package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8000 5173

CMD ["npm", "run", "start"]