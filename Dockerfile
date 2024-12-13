
FROM node:16 AS builder


WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force && npm install

RUN npm install

COPY . .


FROM node:18-slim

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 3000

CMD ["node", "src/index.js"]