'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  timestamp: {type: Date, required: true},
  manuscriptID: {type: mongoose.Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('Chapter', schema);
