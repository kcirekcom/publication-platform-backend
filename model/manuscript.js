'use strict';

const mongoose = require('mongoose');
const createError = require('http-errors');
const debug = require('debug')('publication-platform-backend:manuscript');

const schema = new mongoose.Schema({
  title: {type: String, required: true},
  desc: {type: String, required: true},
  timestamp: {type: Date, default: Date.now},
  chapters: [{type: mongoose.Schema.Types.ObjectId, ref: 'chapter'}],
  userID: {type: mongoose.Schema.Types.ObjectId, required: true}
});

const Manuscript = module.exports = mongoose.model('Manuscript', schema);
const Chapter = require('./chapter.js');

Manuscript.findByIdAndAddChapter = function(id, chapter) {
  debug('findByIdAndAddChapter');

  return Manuscript.findById(id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then(manuscript => {
    chapter.manuscriptID = manuscript._id;
    this.tempManuscript = manuscript;
    return new Chapter(chapter).save();
  })
  .then(chapter => {
    this.tempManuscript.chapters.push(chapter._id);
    this.tempChapter = chapter;
    return this.tempManuscript.save();
  })
  .then(() => {
    return this.tempChapter;
  });
};
