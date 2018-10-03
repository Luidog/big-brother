'use strict';

const { Router } = require('express');
const face = require('./face.controller');
const { authentication, upload, validation, Joi } = require('../../services');
const router = Router();

router.post(
  '/',
  upload.array('face'),
  face.train
);

router.post(
  '/',
  upload.file('face'),
  face.recognize
);

module.exports = router;
