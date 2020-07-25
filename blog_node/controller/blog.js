const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const router = express.Router();

const Blog = require('../model/blog.model');
const Comment = require('../model/comment.model');
const Reaction = require('../model/reaction.model');
const Author = require('../model/author.model');
const fileUpload = require('../middleware/file-upload');
const HttpError = require('../model/HttpError');

router.get('/getBlogs', async (req, res) => {
  try {
    const fetchedBlogs = await Blog.find();
    res.json(fetchedBlogs);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get('/getBlogs/:category', async (req, res) => {
  console.log(req.params.category);
  try {
    const blogs = await Blog.find({ category: req.params.category });
    res.json(blogs);
  } catch (err) {
    res.json({ message: err });
  }
});

router.get('/getBlogsById/:blogId', async (req, res) => {
  try {
    const blogs = await Blog.find({ blogId: req.params.blogId });
    res.json(blogs);
  } catch (err) {
    res.json({ message: err });
  }
});
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '..', '..', 'blog-new', 'public', 'images'));
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });
// var upload = multer({ storage: storage });
router.post('/addBlog', fileUpload.single('poster'), async (req, res, next) => {
  console.log(req.file);
  if (req.file === undefined) {
    res.json({ message: 'file format not supported' });
  }
  const blog = new Blog({
    blogId: req.body.blogId,
    title: req.body.title,
    category: req.body.category,
    poster: req.body.poster,
    body: req.body.body,
    authorId: req.body.authorId,
  });
  try {
    const savedBlog = await blog.save();
    console.log(savedBlog);
    return res.json(savedBlog);
  } catch (err) {
    return next(new HttpError(err.message, 500));
  }
});

router.patch('/editBlog/:blogId', async (req, res) => {
  let blogs;
  try {
    blogs = await Blog.find({ blogId: req.params.blogId });
    blogs = blogs[0];
    blogs.title = req.body.title;
    blogs.dateTime = req.body.dateTime;
    blogs.poster = req.body.poster;
    blogs.body = req.body.body;
    return res.json(await blogs.save());
  } catch (err) {
    if (blogs == null) {
      res.json({ message: err.message });
      console.log('null daata');
    } else {
      res.json({ message: err.message });
    }
  }
});

router.delete('/:blogId', async (req, res) => {
  try {
    const removedBlog = await Blog.remove({ blogId: req.params.blogId });
    res.send({ message: 'deleted successfully!!' });
  } catch (err) {
    res.json({ message: err.message });
  }
});

//blog comment

router.get('/getBlogComments/:blogId', async (req, res) => {
  try {
    const blogs = await Blog.find({ blogId: req.params.blogId });
    console.log(blogs[0].comments);
    //blogs = blogs[0];
    res.json(blogs[0].comments);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post('/addBlogComment/:blogId', async (req, res) => {
  const comment = new Comment({
    commentId: req.body.commentId,
    body: req.body.body,
    authorId: req.body.authorId,
  });
  try {
    const blog = await Blog.find({ blogId: req.params.blogId });
    blog[0].comments.push(comment);
    res.json(await blog[0].save());
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.patch('/:blogId', async (req, res) => {
  try {
    const fetchedBlog = await Blog.find({ blogId: req.params.blogId });

    let commentArray = fetchedBlog[0].comments;
    for (var key in commentArray) {
      if (commentArray[key].commentId == req.body.commentId) {
        commentArray[key].body = req.body.body;
      }
    }
    fetchedBlog[0].comments = commentArray;
    console.log(fetchedBlog[0]);
    await fetchedBlog[0].save();
    res.json({ message: 'updated successfully!!' });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.delete('/:blogId/:commentId', async (req, res) => {
  try {
    const fetchedBlog = await Blog.find({ blogId: req.params.blogId });
    updatedComments = fetchedBlog[0].comments.filter((comment) => {
      return comment.commentId != req.params.commentId;
    });
    fetchedBlog[0].comments = updatedComments;

    await fetchedBlog[0].save();
    res.json({ message: 'deleted successfully!!' });
  } catch (err) {
    res.json({ message: err.message });
  }
});

//blog reaction
router.post('/addBlogReaction/:blogId', async (req, res) => {
  const reaction = new Reaction({
    authorId: req.body.authorId,
    reactionType: req.body.reactionType,
  });
  try {
    const blog = await Blog.find({ blogId: req.params.blogId });
    blog[0].reactions.push(reaction);
    res.json(await blog[0].save());
  } catch (err) {
    res.json({ message: err.message });
  }
});

//blog comment reaction
router.post('/addCommentReaction/:blogId/:commentId', async (req, res) => {
  const reaction = new Reaction({
    authorId: req.body.authorId,
    reactionType: req.body.reactionType,
  });
  try {
    const fetchedBlog = await Blog.find({ blogId: req.params.blogId });
    let commentArray = fetchedBlog[0].comments;
    for (var key in commentArray) {
      if (commentArray[key].commentId == req.params.commentId) {
        commentArray[key].reactions.push(reaction);
      }
    }
    fetchedBlog[0].comments = commentArray;
    await fetchedBlog[0].save();
    res.json(await fetchedBlog[0].save());
  } catch (err) {
    res.json({ message: err.message });
  }
});

module.exports = router;
