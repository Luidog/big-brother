'use strict';

const os = require('os');
const { connect } = require('marpat');
const { server } = require('./server');
const routes = require('./routes');
const { port, env, datastore, credentials } = require('./configuration');
const { logger, Filemaker, schedule } = require('./services');

const startServer = () =>
  connect(datastore.url)
    .then(db =>{
      routes(server)
      server.listen(port, () =>
        logger.info('Facial Recognition Server Running', {
          cores: os.cpus().length,
          port: port,
          environment: env
        })
      )
    })

setImmediate(startServer);
