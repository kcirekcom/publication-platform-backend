'use strict';

const jsonParser = require('body-parser').json();
const debug = require('debug')('publication-platform-backend:auth-router');
const Router = require('express').Router;
const basicAuth = require('../lib/basic-auth-middleware.js');

const User = require('../model/user.js');

const authRouter = module.exports = Router();

authRouter.post('/api/create-admin', jsonParser, function(req, res, next) {
  debug('POST: /api/create-admin');

  if (!req.body.email || !req.body.password) {
    res.status(400).send();
    return;
  }

  let password = req.body.password;
  delete req.body.password;

  let user = new User(req.body);

  user.generatePasswordHash(password)
  .then(user => user.save())
  .then(user => user.generateToken())
  .then(token => res.send(token))
  .catch(next);
});

authRouter.get('/api/admin-signin', basicAuth, function(req, res, next) {
  debug('GET: /api/admin-signin');

  User.findOne({username: req.auth.username})
  .then(user => user.comparePasswordHash(req.auth.password))
  .then(user => user.generateToken())
  .then(token => res.send(token))
  .catch(next);
});
