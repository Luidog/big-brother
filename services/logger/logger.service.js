'use strict';

const { createLogger, transports } = require('winston');

const consoleTransport = level => new transports.Console({ level: level });

const logger = createLogger({
  transports: [consoleTransport('silly')],
  exitOnError: false
});

logger.emitErrs = true;

module.exports = { logger };
