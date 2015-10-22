FROM ubuntu

RUN apt-get update
RUN apt-get install nginx curl -y
RUN curl -L https://github.com/kelseyhightower/confd/releases/download/v0.10.0/confd-0.10.0-linux-amd64 -o /usr/local/bin/confd
RUN chmod +x /usr/local/bin/confd
RUN mkdir -p /etc/confd/{conf.d,templates}

RUN rm /etc/nginx/sites-enabled/default
COPY ./nginx.toml /etc/confd/conf.d/nginx.toml
COPY ./nginx.tmpl /etc/confd/templates/nginx.tmpl
COPY ./confd-watch /usr/local/bin/confd-watch
RUN chmod +x /usr/local/bin/confd-watch

EXPOSE 80

CMD ["./usr/local/bin/confd-watch"]
