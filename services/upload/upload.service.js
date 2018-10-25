'use strict';

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'data/');
  }
});

const upload = multer({ storage });

module.exports = { upload }