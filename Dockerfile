FROM nginx:1.22
VOLUME /tmp
COPY ./dist/ /usr/share/nginx/html/
EXPOSE 8081
