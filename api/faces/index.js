'use strict';

const { Router } = require('express');
const face = require('./face.controller');
const { authentication, validation, Joi } = require('../../services');
const router = Router();

router.post(
  '/',
  face.train
);

router.post(
  '/',
  face.recognize
);

module.exports = router;
