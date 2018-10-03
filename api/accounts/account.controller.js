'use strict';

const { redirects } = require('../../configuration');
const { Account } = require('../../services');

/**
 * Creates a new account
 */
exports.create = (req, res) =>
  Account.register(req.body.name, req.body.password)
    .then(account => res.status(200).json(account))
    .catch(error => res.boom.badRequest(error.message));

exports.remove = (req, res) =>
  Account.findOne({ uid: req.params.uid })
    .then(account => (account ? account.delete() : null))
    .then(
      account =>
        account
          ? res
              .status(200)
              .json({ message: 'Account Removed', uid: req.params.uid })
          : res.boom.notFound('No accounts found')
    )
    .catch(error => res.boom.badRequest(error.message));
