/* global describe before it */

const { expect } = require('chai');
const { connect } = require('marpat');
const { server } = require('../server');
const routes = require('../routes');
const environment = require('dotenv');
const varium = require('varium');
const request = require('supertest');

environment.config({ path: './tests/.env' });

varium(process.env, './tests/env.manifest');

describe('Server Health API', () => {
  before(done => {
    connect(process.env.DATASTORE_URL_TEST).then(db => done());
    routes(server);
  });
  it('responds with a message', done => {
    request(server)
      .get('/health')
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body)
          .to.be.an('object')
          .with.all.keys('message');
        if (err) return done(err);
        done();
      });
  });
});
