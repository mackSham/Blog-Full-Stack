const mongoose = require("mongoose");

var ReactionSchema = new mongoose.Schema({
  authorId: "String",
  reactionType: "String",
});

module.exports = mongoose.model("Reaction", ReactionSchema);
