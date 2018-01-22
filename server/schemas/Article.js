// Configure Schema
const mongoose = require('mongoose');
const articleSchema  = mongoose.Schema({
  created_at: Date,
  title: String,
  url: String,
  author: String,
  points: Number,
  story_text: String,
  comment_text: String,
  num_comments: Number,
  story_id: Number,
  story_title: String,
  story_url: String,
  parent_id: Number,
  created_at_i: Number,
  _tags: Array,
  objectID: Number,
  _highlightResult: {
    author: {
      value: String,
      matchLevel: String,
      matchedWords: Array
    },
    comment_text: {
      value: String,
      matchLevel: String,
      fullyHighlighted: Boolean,
      matchedWords: Array
    },
    story_title: {
      value: String,
      matchLevel: String,
      matchedWords: Array
    },
    story_url: {
      value: String,
      matchLevel: String,
      matchedWords: Array
    }
  }
});

module.exports = articleSchema;
