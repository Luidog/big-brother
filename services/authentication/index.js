'use strict';

const { setup, verify, restrict } = require('./authentication.service');

module.exports = { authentication: { setup, verify, restrict } };
