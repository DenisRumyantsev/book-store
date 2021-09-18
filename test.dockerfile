# server
FROM node:lts-alpine AS server
WORKDIR /server
COPY ./server/package*.json ./
RUN npm install
COPY ./server/ ./

# test
FROM node:lts-alpine AS test
WORKDIR /test
COPY ./test/package*.json ./
RUN npm install
COPY ./test/ ./

# final stage/image
FROM node:lts-alpine
WORKDIR /app
COPY --from=test ./test/ ./test/
COPY --from=server ./server/ ./server/
ENTRYPOINT cd test && npm run test