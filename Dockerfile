FROM node:20

WORKDIR /app

COPY package.json .
RUN npm config set registry https://registry.npmmirror.com
RUN npm install

COPY src/ ./src
COPY sql/ ./sql

EXPOSE 3000

CMD ["node", "src/index.js"]