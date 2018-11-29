'use strict';

const algorithm = process.env.ENCRYPTION_ALGORITHM;
const key = process.env.ENCRYPTION_KEY;
const length = process.env.ENCRYPTION_IV_LENGTH;

module.exports = { key, length, algorithm };
