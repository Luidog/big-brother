'use strict';

const { connect } = require('marpat');
const { server } = require('./server');
const routes = require('./routes');
const { port, env, datastore, filemaker } = require('./configuration');
const { logger, encryption, Filemaker } = require('./services');

const startServer = () =>
  connect(datastore.url, encryption).then(db => {
    routes(server);
    Filemaker.findOne()
      .then(client => {
        if (!client) {
          client = Filemaker.create(filemaker);
        }
        return client.save();
      })
      .catch(error => logger.warn(error.message, error));
    server.listen(port, () =>
      logger.info('Facial Recognition Server Running', {
        port: port,
        environment: env
      })
    );
  });

setImmediate(startServer);
