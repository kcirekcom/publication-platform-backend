'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const createError = require('http-errors');
const debug = require('debug')('publication-platform-backend:chapter-router');

const Manuscript = require('../model/manuscript.js');
const Chapter = require('../model/manuscript.js');
const bearerAuth = require('../lib/bearer-auth-middleware.js');

const chapterRouter = module.exports = Router();

chapterRouter.post('/api/manuscript/:manuscriptID/chapter', bearerAuth, jsonParser, function(req, res, next) {
  debug('POST: /api/manuscript/:manuscriptID/chapter');

  Manuscript.findByIdAndAddChapter(req.params.manuscriptID, req.body)
  .then(chapter => res.json(chapter))
  .catch(next);
});

<<<<<<< HEAD
chapterRouter.get('/api/chapters', function(req, res, next) {
  debug('GET: /api/chapters');


  Chapter.find({})
  .then(chapters => {
    console.log(chapters);
    if (chapters === null) return next(createError(404, 'no chapters found'));
    res.json(chapters);
  })
  .catch(next);
});

=======
>>>>>>> master
chapterRouter.get('/api/chapter/:id', bearerAuth, function(req, res, next) {
  debug('GET: /api/chapter/:id');

  Chapter.findById(req.params.id)
  .then(chapter => res.json(chapter))
  .catch(err => next(createError(404, err.message)));
});

chapterRouter.put('/api/chapter/:id', bearerAuth, jsonParser, function(req, res, next) {
  debug('PUT: /api/chapter/:id');

  req.body.timestamp = new Date();
  Chapter.findByIdAndUpdate(req.params.id, req.body, {new: true})
  .then(chapter => res.json(chapter))
  .catch(err => next(createError(404, err.message)));
});

chapterRouter.delete('/api/chapter/:id', bearerAuth, function(req, res, next) {
  debug('DELETE: /api/chapter/:id');

  Chapter.findByIdAndRemove(req.params.id)
  .then(() => res.status(204).send())
  .catch(err => next(createError(404, err.message)));
});
