'use strict';

const filemaker = {
  application: process.env.FILEMAKER_APPLICATION,
  server: process.env.FILEMAKER_SERVER,
  user: process.env.FILEMAKER_USERNAME,
  password: process.env.FILEMAKER_PASSWORD
};

module.exports = { filemaker };
