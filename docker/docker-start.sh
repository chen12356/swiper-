#!/bin/bash

#启动 Redis 容器
docker run -d --name=rds --netword=swiper-net --ip=172.19.0.20 rds

#启动 MySQL 容器
docker run -d --name=db --netword=swiper-net --ip=172.19.0.30 -r MYSQL_ROOTPASSWORD=123456 mysql:5.7.29

#启动 Celery 容器
docker run -d

#启动 swiper 容器
docker run -d
