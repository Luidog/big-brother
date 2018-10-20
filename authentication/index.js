'use strict';

const { Router } = require('express');
const { access } = require('./authentication.controller')
const { validation, Joi } = require('../services')

const router = Router();

router.post(
  '/',
  validation.test({
    body: Joi.object().keys({
      username: Joi.string().required(),
      password: Joi.string().required()
    })
  }),
  access
);

module.exports = router;
