FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx playwright install --with-deps

CMD ["npm", "test"]
