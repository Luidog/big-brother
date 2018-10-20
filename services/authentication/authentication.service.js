'use strict';

const passport = require('passport');
const { Strategy } = require('passport-local');
const { compose } = require('compose-middleware');

const { Account } = require('../account');

const header = (req, res, next) => {
  req.headers.authorization = req.get('authorization');
  if (!req.headers.authorization) {
    return res.boom.unauthorized('Authorization header is missing.');
  }
  next();
};

const validateAuthentication = (req, res, next) =>
  token.validate(req, res, next);

const errors = (error, req, res, next) => {
  if (error) return res.boom.unauthorized(error.message);
  next(res, res, next);
};

const attach = (req, res, next) => {
  console.log(req.account);

  Account.findOne({ uid: req.account.uid })
    .then(account => {
      if (!account) {
        return res.boom.unauthorized(
          'There is no account associated with that token.'
        );
      }
      req.account = account;
      next();
    })
    .catch(error => next(error));
};

const verify = () => compose([header, validateAuthentication, errors, attach]);

const restrict = role => {
  if (!role) {
    throw new Error('Required role needs to be set');
  }
  return compose([
    (req, res, next) =>
      roles.indexOf(req.account.role) === roles.indexOf(role)
        ? next()
        : res.boom.unauthorized(`You do not have the required ${role} role.`)
  ]);
};

const setup = () =>
  passport.use(
    new Strategy(
      {
        usernameField: 'username',
        passwordField: 'password'
      },
      (username, password, done) => Account.authenticate(username, password, done)
    )
  );

module.exports = {
  setup,
  verify,
  restrict
};
