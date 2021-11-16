FROM node AS build
WORKDIR /usr/local/app
COPY package.json package-lock.json /usr/local/app/
RUN npm install
COPY . /usr/local/app/
RUN npm run build --prod

FROM nginx
COPY --from=build /usr/local/app/dist/shop /usr/share/nginx/html

EXPOSE 80