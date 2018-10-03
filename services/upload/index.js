'use strict';

const multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'data/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '.jpg'); //Appending .jpg
  }
});

const upload = multer({ storage });

module.exports = {
  upload
};
