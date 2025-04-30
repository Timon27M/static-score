FROM node:latest
WORKDIR /usr/src/app
COPY . /var/www/html/
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["node", "app.js"]