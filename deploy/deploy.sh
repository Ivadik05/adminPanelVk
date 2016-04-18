#!/bin/bash
USERNAME="root"
HOSTS="vsevzaimosvyazano.ru"
SCRIPT="cd ~/projects/vsevzaimosvyazano; npm run deploy"
out="log.txt"
for HOSTNAME in ${HOSTS} ; do
    ssh -l ${USERNAME} ${HOSTNAME} -A "${SCRIPT}" > ${out}
done
