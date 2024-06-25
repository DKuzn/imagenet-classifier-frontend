FROM node:18-alpine as build
WORKDIR /app
COPY package.json /app/package.json
RUN export NODE_OPTIONS=--openssl-legacy-provider
RUN npm install
COPY src /app/src/
COPY tsconfig* /app/
COPY angular.json /app/
RUN npm run docker

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist /app/dist
COPY package.json /app/package.json
COPY server.js /app
RUN npm install --omit=dev

ENV PORT=80

ENTRYPOINT ["npm", "run", "serve"]
