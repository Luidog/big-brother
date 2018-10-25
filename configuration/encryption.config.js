'use strict';

const algorithm = process.env.ENCRYPTION_ALGORITHM;
const key = process.env.ENCRYPTION_KEY;

module.exports = { key, algorithm }