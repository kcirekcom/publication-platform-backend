'use strict';

const mongoose = require('mongoose');
// const createError = require('http-errors');
// const debug = require('debug')('pin:board');

// const Pin = require('./pin.js');

const schema = new mongoose.Schema({
  title: {type: String, required: true},
  timestamp: {type: Date, required: true},
  chapters: [{type: mongoose.Schema.Types.ObjectId, ref: 'chapter'}]
});

module.exports = mongoose.model('Manuscript', schema);
