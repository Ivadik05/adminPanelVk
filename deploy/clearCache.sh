#!/bin/bash
USERNAME="root"
HOSTS="vsevzaimosvyazano.ru"
SCRIPT="rm -rf /var/cache/nginx/*"
out="./log.txt"
for HOSTNAME in ${HOSTS} ; do
    ssh -l ${USERNAME} ${HOSTNAME} -A "${SCRIPT}" > ${out}
done
