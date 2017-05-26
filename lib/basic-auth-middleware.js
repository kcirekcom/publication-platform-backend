'use strict';

const createError = require('http-errors');
const debug = require('debug')('publication-platform-backend:basic-auth-middleware');

module.exports = function(req, res, next) {
  debug();

  var authHeader = req.headers.authorization;
  if (!authHeader) {
    return next(createError(401, 'authorization header required'));
  }

  var base64str = authHeader.split('Basic ')[1];
  if (!base64str) {
    return next(createError(401, 'email and password required'));
  }

  var utf8str = new Buffer(base64str, 'base64').toString();
  var authArray = utf8str.split(':');

  req.auth = {
    email: authArray[0],
    password: authArray[1]
  };

  if (!req.auth.email || !req.auth.password) {
    return next(createError(401, 'email or password required'));
  }

  next();
};
