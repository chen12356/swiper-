FROM ubuntu:latest

COPY ../../requirements.txt /root/requirements.txt
RUN apt update \
    && apt upgrade -y \
    && apt install -y python3 python3-pip \
    && apt install -i https://pypi.douban.com/simple -r /root/requirements.txt \
    && rm /root/requirements.txt \
    && apt autoremove -y \
    && apt autoclean

EXPOSE 9000
CMD bash /opt/swiper/docke/swiper-start.sh
