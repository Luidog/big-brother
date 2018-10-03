'use strict';

const tokens = {
  secret: process.env.TOKEN_SECRET,
  algorithm: process.env.TOKEN_ALGORITHM,
  options: {
    expiresIn: process.env.TOKEN_EXPIRATION,
    issuer: process.env.TOKEN_ISSUER
  }
};

module.exports = {
  tokens
};