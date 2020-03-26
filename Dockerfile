#FROM node:13.10.1-alpine3.11 AS compile-image
#
#WORKDIR /opt/ng
#RUN npm install
#
#ENV PATH="./node_modules/.bin:$PATH"
#
#COPY . ./
#RUN ng build --prod

FROM node:13.10.1-alpine3.11 AS build-step
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx:1.17.9-alpine as prod-stage
COPY --from=build-step /app/dist/bureauDeChange /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


#FROM node:13.10.1-alpine3.11 AS compile-image
#
#WORKDIR /opt/ng
#RUN npm install
#
#ENV PATH="./node_modules/.bin:$PATH"
#
#COPY . ./
#RUN ng build --prod
#
#FROM nginx:1.17.9-alpine
#COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
#COPY --from=compile-image /opt/ng/dist/bureauDeChange /usr/share/nginx/html
