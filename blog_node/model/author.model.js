const mongoose = require("mongoose");

var AuthorSchema = new mongoose.Schema({
  authorId: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: "Name is required.",
  },
  photo: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("author", AuthorSchema);
