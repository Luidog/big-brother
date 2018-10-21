'use strict';

const { Router } = require('express');
const face = require('./face.controller');
const { authentication, validation, Joi } = require('../../services');
const router = Router();

router.post(
  '/',
  validation.test({
    body: Joi.object().keys({
      name: Joi.string().required()
    })
  }),
  authentication.verify(),
  face.train
);

router.post(
  '/recognize',
  validation.test({
    body: Joi.object().keys({
      id: Joi.string().required()
    })
  }),
  authentication.verify(),
  face.recognize
);

module.exports = router;
