/* global describe before after beforeEach it */

const { expect } = require('chai');
const { connect } = require('marpat');
const { server } = require('../server');
const routes = require('../routes');
const { Account } = require('../services');
const environment = require('dotenv');
const varium = require('varium');
const request = require('supertest');
const { mock } = require('./data');

environment.config({ path: './tests/.env' });

varium(process.env, './tests/env.manifest');

describe('Authentication API', () => {
  let token, uid, authentication;
  before(done => {
    connect(process.env.DATASTORE_URL_TEST).then(db => done());
    routes(server)
  });
  after(done => {
    Account.deleteOne({ username: mock.account.username }).then(account => done());
  });
  before(done => {
    request(server)
      .post('/api/accounts')
      .send(mock.account)
      .end((err, res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body)
          .to.be.an('object')
          .with.all.keys(
            'uid',
            'name'
          )
        if (err) return done(err);
        done();
      });
  });
  describe('Local Authentication Endpoint', () => {
    it('should allow you to authenticate', done => {
      request(server)
        .post('/authentication')
        .send(mock.account)
        .expect(200)
        .end((err, res) => {
          authentication = res.body.authentication;
          expect(res.statusCode).to.equal(200);
          expect(res.body)
            .to.be.an('object')
            .with.all.keys('token');
          if (err) return done(err);
          done();
        });
    });

    it('should reject missing credentials', done => {
      request(server)
        .post('/authentication')
        .send({ username: mock.account.username })
        .expect(400)
        .end((err, res) => {
          expect(res.body)
            .to.be.an('object')
            .with.all.keys('statusCode', 'message', 'error');
          if (err) return done(err);
          done();
        });
    });

    it('should reject incorrect credentials to authenticate', done => {
      request(server)
        .post('/authentication')
        .send({ username: mock.account.username, password: 'wrong-password' })
        .expect(401)
        .end((err, res) => {
          expect(res.body)
            .to.be.an('object')
            .with.all.keys('statusCode', 'message', 'error');
          if (err) return done(err);
          done();
        });
    });
  });

});
