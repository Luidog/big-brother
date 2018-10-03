'use strict';

const { test, errors, Joi } = require('./validation.service');

module.exports = {
  validation: {
    test,
    errors
  },
  Joi
};
