FROM node:13.10.1-alpine3.11 AS build-step
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod
FROM nginx:1.17.9-alpine as prod-stage
COPY --from=build-step /app/dist/bureauDeChange /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

