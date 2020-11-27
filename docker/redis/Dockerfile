FROM redis:latest

VOLUME /data/redis
RUN mkdir -p /data/redis
COPY ./redis.conf /etc/
CMD redis-server /etc/redis.conf

