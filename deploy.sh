#!/bin/sh

# script is ran on restart per
# https://askubuntu.com/a/816

cd "$(dirname "$0")"
git fetch origin
git reset --hard origin/master 
npm i
pm2 restart all

