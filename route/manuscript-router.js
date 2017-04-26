'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('publication-platform-backend:manuscript-router');

const Manuscript = require('../model/manuscript.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const manuscriptRouter = module.exports = Router();

manuscriptRouter.post('/api/manuscript', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/manuscript');

  if (!req.body.title || !req.body.desc) {
    res.status(400).send();
    return;
  }

  req.body.userID = req.user._id;
  new Manuscript(req.body).save()
  .then(manuscript => res.json(manuscript))
  .catch(next);
});

manuscriptRouter.get('/api/manuscript', function(req, res, next) {
  debug('GET: /api/manuscript');

  Manuscript.find({})
  .populate('chapters')
  .then(manuscripts => {
    if(manuscripts === null) return next(createError(404, 'no posts found'));
    res.json(manuscripts);
  })
  .catch(next);
});

manuscriptRouter.get('/api/manuscript/:id', bearerAuth, function(req, res, next) {
  debug('GET: /api/manuscript/:id');

  Manuscript.findById(req.params.id)
  .populate('chapters')
  .then(manuscript => {
    if (manuscript.userID.toString() !== req.user._id.toString()) {
      return next(createError(401, 'invalid user'));
    }
    res.json(manuscript);
  })
  .catch(next);
});

manuscriptRouter.put('/api/manuscript/:id', bearerAuth, jsonParser, function(req, res, next) {
  debug('PUT: /api/manuscript/:id');

  if (!req.body.title || !req.body.desc) {
    res.status(400).send();
    return;
  }

  Manuscript.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .populate('chapters')
  .then(manuscript => {
    if (manuscript.userID.toString() !== req.user._id.toString()) {
      return next(createError(401, 'invalid user'));
    }
    res.json(manuscript);
  })
  .catch(next);
});

manuscriptRouter.delete('/api/manuscript/:id', bearerAuth, function(req, res, next) {
  debug('DELETE: /api/manuscript/:id');

  Manuscript.findByIdAndRemove(req.params.id)
  .then(manuscript => {
    if (manuscript.userID.toString() !== req.user._id.toString()) {
      return next(createError(401, 'invalid user'));
    }
    res.status(204).send();
  })
  .catch(next);
});

manuscriptRouter.get('/api/user/:id/manuscript', bearerAuth, function(req, res, next){
  debug('GET: /api/user/:id/manuscript');

  Manuscript.findOne({userID: req.params.id})
  .then(manuscript => {
    res.json(manuscript);
  })
  .catch(err => next(createError(404, err.message)));
});
