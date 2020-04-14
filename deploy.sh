#!/bin/sh

# script is ran on restart per
# https://askubuntu.com/a/816

cd "$(dirname "$0")"
pm2 stop all 
pm2 delete all
git fetch origin
git reset --hard origin/master 
npm i
pm2 start ./pm2/ecosystem.config.js
pm2 save