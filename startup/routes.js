const express = require('express');
const ganresRouter = require('./../router/ganres');
const customersRouter = require('./../router/customers');
const moviesRouter = require('./../router/movies');
const rentalsRouter = require('./../router/rentals');
const userRouter = require('./../router/users');  
const error = require('./../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use(express.static('public')); // serve static files
  app.use('/api/ganres',ganresRouter);
  app.use('/api/customers',customersRouter);
  app.use('/api/movies', moviesRouter);
  app.use('/api/rentals', rentalsRouter);
  app.use('/api/users', userRouter);
  app.use(error)
}