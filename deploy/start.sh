#!/bin/bash
source /home/ec2-user/.bash_profile
cd /home/ec2-user/big-brother
sudo npm install
sudo npm install face-recognition
cd /home/ec2-user
pm2 start ecosystem.config.js