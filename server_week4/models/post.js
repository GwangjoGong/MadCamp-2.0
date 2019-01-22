var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MadCampPosts');

var Schema = mongoose.Schema;

var postSchema = new Schema({
  postSort: String,
  postType: String,
  postName: String,
  postText: String,
  postCode: String,
  postedBy: String,
  privacy: Number,
  updatedOn: String,
  comments:[{
    name:String, body:String
  }]
});

module.exports = mongoose.model('Post',postSchema);
