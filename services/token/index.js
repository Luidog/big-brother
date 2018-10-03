const { authentication, validate } = require('./token.service.js');

module.exports = {
  token: {
    validate,
    authentication
  }
};
