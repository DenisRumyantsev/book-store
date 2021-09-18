# client
FROM node:lts-alpine as client
WORKDIR /client
COPY ./client/package*.json ./
RUN npm install
COPY ./client/ ./
ENV NODE_ENV="production"
RUN npm run build

# nginx
FROM nginx:alpine
COPY --from=client ./client/build/ ./usr/share/nginx/html/
COPY ./nginx.conf ./etc/nginx/
CMD ["nginx", "-g", "daemon off;"]
