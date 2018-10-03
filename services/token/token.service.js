'use strict';

const { tokens } = require('../../configuration');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const authentication = payload =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      tokens.secret,
      tokens.options,
      (error, token) => (error ? reject(error) : resolve(token))
    )
  );

const validate = (req, res, next) => expressJwt({
    secret: tokens.secret,
    issuer: tokens.issuer,
    requestProperty: 'account'
  })(req, res, next);

module.exports = {
  authentication,
  validate
};
