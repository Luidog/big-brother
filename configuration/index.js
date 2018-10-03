'use strict';

const path = require('path');
const environment = require('dotenv');
const varium = require('varium');
const manifest = path.join(__dirname, '/../env.manifest');

environment.config();

varium(process.env, manifest);

const port = process.env.PORT;
const env = process.env.ENVIRONMENT;

const { datastore } = require('./datastore.config')
const { redirects } = require('./redirects.config')
const { tokens } = require('./tokens.config')

module.exports = {
  port,
  env,
  datastore,
  redirects,
  tokens
}