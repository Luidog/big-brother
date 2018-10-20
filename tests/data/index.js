'use strict';

const environment = require('dotenv');
const varium = require('varium');

environment.config({ path: './tests/.env' });

varium(process.env, './tests/env.manifest');


const account = {
  username: process.env.SERVICE_USERNAME,
  password: process.env.SERVICE_PASSWORD
};


const filemaker = {
  application: process.env.FILEMAKER_APPLICATION,
  server: process.env.FILEMAKER_SERVER,
  user: process.env.FILEMAKER_USERNAME,
  password: process.env.FILEMAKER_PASSWORD
};

module.exports = {
  mock: {
    filemaker,
    account,
  }
};
