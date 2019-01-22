var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MadCampWords');

var Schema = mongoose.Schema;

var wordSchema = new Schema({
  first : String,
  second : String,
  third : String
});

module.exports = mongoose.model('Word',wordSchema);
