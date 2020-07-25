const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Author = require("../model/author.model");

router.get("/getAuthors", async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/getAuthorsById/:authorId", async (req, res) => {
  try {
    const author = await Author.find({ authorId: req.params.authorId });
    console.log(author);
    res.json(author);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.post("/addAuthor", async (req, res) => {
  const author = new Author({
    authorId: req.body.authorId,
    authorName: req.body.authorName,
    photo: req.body.photo,
    about: req.body.about,
  });
  try {
    const savedAuthor = await author.save();
    console.log(savedAuthor);
    res.json(savedAuthor);
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
