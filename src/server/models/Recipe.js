'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  created_at: { type: Date, default: Date.now },
  difficulty: { type: Date, default: 'recipe/difficulty/easy' },
  images: [{ filename: ObjectId, order: Number }],
  lang: String,
  last_update: Date,
  servings: Number,
  steps: [{ body: String, order: Number }],
  summary: String,
  time: Number,
  title:  String,
});

module.exports = RecipeSchema;
