const mongoose = require('mongoose');

var BlogSchema = new mongoose.Schema({
  blogId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: 'Title is required.',
  },
  category: {
    type: String,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  poster: { type: String },
  body: {
    type: String,
    required: 'Blog body is required.',
  },
  authorId: {
    type: String,
    required: 'Author ID is required.',
  },
  comments: [
    {
      commentId: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: 'Blog body is required.',
      },
      authorId: {
        type: String,
        required: 'Author ID is required.',
      },
      dateTime: {
        type: Date,
        default: Date.now,
      },
      reactions: [
        {
          authorId: {
            type: String,
            required: 'Author ID is required.',
          },
          reactionType: {
            type: String,
            required: 'Reaction Type is required.',
          },
        },
      ],
    },
  ],
  reactions: [
    {
      authorId: {
        type: String,
        required: 'Author ID is required.',
      },
      reactionType: {
        type: String,
        required: 'Reaction Type is required.',
      },
    },
  ],
});

module.exports = mongoose.model('blog', BlogSchema);
