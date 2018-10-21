#!/bin/bash
source /home/ec2-user/.bash_profile
cd /home/ec2-user/big-brother
rm -rf ./node_modules
npm install
cd /home/ec2-user
pm2 start ecosystem.config.js