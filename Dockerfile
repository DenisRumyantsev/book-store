# client
FROM node:lts-alpine as client
WORKDIR /client
COPY ./client/package*.json ./
RUN npm install
COPY ./client/ ./
ENV NODE_ENV="production"
RUN npm run build

# server
FROM node:lts-alpine AS server
WORKDIR /server
COPY ./server/package*.json ./
RUN npm install
COPY ./server/ ./

# final stage/image
FROM node:lts-alpine
WORKDIR /app
COPY --from=server ./server/ ./
COPY --from=client ./client/build/ ./build/
ENTRYPOINT npm start