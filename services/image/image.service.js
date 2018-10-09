'use strict';

const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const axios = require('axios');
const { CookieJar } = require('tough-cookie');
const Nodestream = require('nodestream');

const destination = new Nodestream({
  adapter: 'filesystem',
  config: {
    root: [process.cwd(), 'data']
  }
});

axiosCookieJarSupport(axios);

const transport = (url, parameters = {}) =>
  axios
    .get(url, {
      jar: new CookieJar(),
      responseType: 'stream',
      withCredentials: true
    })
    .then(response => destination.upload(response.data, parameters));

const recall = (recordId, file) => {};

module.exports = { transport, recall };
