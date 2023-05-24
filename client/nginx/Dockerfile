FROM nginx:alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy config files
# *.conf files in "conf.d/" dir get included in main config
COPY ./default.conf /etc/nginx/conf.d/

COPY ./certs/fullchain.pem /etc/nginx/certs/
COPY ./certs/privkey.pem /etc/nginx/certs/

RUN echo $(ls /etc/nginx/certs)

# Expose the listening port
EXPOSE 80

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]

RUN echo $(ls /etc/nginx/certs)