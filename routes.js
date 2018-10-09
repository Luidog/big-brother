'use strict';

const { redirects } = require('./configuration');
const { validation, Filemaker, image, authentication } = require('./services');
const _ = require('lodash');
const bodyParser = require('body-parser');
const boom = require('express-boom');
const mongoSanitize = require('express-mongo-sanitize');
const sanitize = require('express-sanitize-escape');

module.exports = app => {
  app.use(boom());
  app.use(bodyParser.json());
  app.use(mongoSanitize());
  app.use(sanitize.middleware());
  authentication.setup();
  app.use('/authentication', require('./authentication'));
  app.use('/api/accounts', require('./api/accounts'));
  app.use('/api/faces', require('./api/faces'));
  app
    .route('/health')
    .get((req, res) => res.status(200).json({ message: 'Server Running' }));

  app.all('*', (req, res) => res.redirect(redirects.url));
  app.use(validation.errors);
};
