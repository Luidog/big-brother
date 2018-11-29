'use strict';

const path = require('path');
const environment = require('dotenv');
const varium = require('varium');
const manifest = path.join(__dirname, '/../env.manifest');

environment.config();

varium(process.env, manifest);

const port = process.env.PORT;
const env = process.env.ENVIRONMENT;

const { filemaker } = require('./filemaker.config');
const { datastore } = require('./datastore.config');
const { redirects } = require('./redirects.config');
const { key, length, algorithm } = require('./encryption.config');
const { tokens } = require('./tokens.config');

module.exports = {
  port,
  env,
  datastore,
  redirects,
  key,
  algorithm,
  length,
  tokens,
  filemaker
};
