FROM node:alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine as production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=build /app/dist ./dist

CMD ["node", "dist/main"]