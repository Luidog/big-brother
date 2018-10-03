'use strict';

const { compose } = require('compose-middleware');
const ms = require('ms');
const { logger } = require('../logger');
const { celebrate, Joi } = require('celebrate');

const test = schema => compose([celebrate(schema)]);

const errors = (error, req, res, next) => {
  logger.error(error.message, { error: error });
  return res.boom.badRequest(error.message);
};

module.exports = {
  test,
  errors,
  Joi
};
