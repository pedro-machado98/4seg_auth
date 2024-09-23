FROM node:20-alpine

WORKDIR /usr/src/whatsyourfinancebot/app

COPY package*.json ./
COPY prisma ./prisma/


RUN npm install

COPY . .

ENV PORT = 3001

EXPOSE 3001

CMD [  "npm", "run", "start:migrate:prod" ]

