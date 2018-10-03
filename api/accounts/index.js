'use strict';

const { Router } = require('express');
const { create, remove } = require('./account.controller');
const { validation, Joi, authentication } = require('../../services');
const router = Router();

router.post(
  '/',
  validation.test({
    body: Joi.object().keys({
      name: Joi.string().required(),
      password: Joi.string().required()
    })
  }),
  create
);

router.delete('/:uid', authentication.verify(), remove);

module.exports = router;
