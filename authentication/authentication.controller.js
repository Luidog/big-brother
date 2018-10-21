'use strict';
const passport = require('passport');
const { token } = require('../services');

exports.access = (req, res, next) =>
  passport.authenticate('local', (error, account, info) => {
    error = error || info;
    if (error) return res.boom.unauthorized(error.message);
    if (!account)
      return res.boom.notFound('There is no account for that token');
    token
      .authentication({ uid: account.uid, type: 'authentication' })
      .then(token =>
        res.status(200).json({
          token: token
        })
      )
      .catch(error => res.boom.badRequest(error.message));
  })(req, res, next);
