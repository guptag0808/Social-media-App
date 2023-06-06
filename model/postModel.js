const mongoose = require('mongoose');

const PostSchema =  mongoose.Schema({
	
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  image: String,
  createdAt: Date,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: Date
  }]
});

const PostModel = mongoose.model('User', PostSchema);

module.exports = {PostModel};