const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name:  String,
  pwd: String,
  token:   String,
  image: ObjectId,
  lang: String
  since: { type: Date, default: Date.now },
  last_activity: Date
});

module.exports = UserSchema;
