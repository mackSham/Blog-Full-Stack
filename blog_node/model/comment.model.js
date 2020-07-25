const mongoose = require("mongoose");

var CommentSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: "Blog body is required.",
  },
  authorId: {
    type: String,
    required: "Author ID is required.",
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  reactions: [
    {
      authorId: {
        type: String,
        required: "Author ID is required.",
      },
      reactionType: {
        type: String,
        required: "Reaction Type is required.",
      },
    },
  ],
});

module.exports = mongoose.model("comment", CommentSchema);
