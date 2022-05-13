#!/bin/bash

echo "Pull code"
cd /root/ui-dashboard
git pull origin master

echo "Deploy code"
npm install
pm2 restart ui