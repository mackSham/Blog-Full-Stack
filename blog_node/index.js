const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const BlogController = require('./controller/blog');
const UserController = require('./controller/author');

const HttpError = require('./model/HttpError');

const application = express();

//Allow CORS Origin
application.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

application.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
application.use(bodyParser.json());

application.use('/blog', BlogController);
//UserController.initialize(application);
application.use('/author', UserController);

//If no routes matches Middleware
application.use((req, res, next) => {
  next(new HttpError('No API matcehed', 404));
});

//Error Handling Middleware
application.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occured' });
});
const port = process.env.PORT || 8000;
mongoose
  .connect('mongodb+srv://mack:XOtgczOzDWLlDguc@cluster0-ddopo.mongodb.net/blogDb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connetcted to database');
    application.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
