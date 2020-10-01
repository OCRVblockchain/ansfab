FROM node:13.12 as build-stage

#ARG API_HOST
#ARG API_PORT
#ARG API_PROTO
#ARG CONTRACT_ADDR

WORKDIR /app
COPY package*.json ./
RUN npm install
#ENV API_HOST=${API_HOST}
#ENV API_PORT=${API_PORT}
#ENV API_PROTO=${API_PROTO}
#ENV CONTRACT_ADDR=${CONTRACT_ADDR}
#RUN touch .env
COPY . .
RUN npm run build

# production stage
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]