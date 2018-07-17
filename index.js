const express = require('express');
const logger  = require('./middleware/logger');
const ganresRouter = require('./router/ganres');
const customersRouter = require('./router/customers');
const moviesRouter = require('./router/movies');
const rentalsRouter = require('./router/rentals');
const userRouter = require('./router/users');         
const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
Joi.objectId = require('joi-objectid')(Joi);


//make sure we have config from environment variables if no - exit
if( !config.get('jwtPrivateKey')) {
  console.error('Fateconfig not defined');
  process.exit(1);
}



mongoose.connect("mongodb://localhost:27017/vidly")
  .then(_ => console.log('connect to mongo success '))
  .catch(err => console.log(err));
const app = express();
app.use(express.json());

app.use(express.static('public')); // serve static files
app.use('/api/ganres',ganresRouter);
app.use('/api/customers',customersRouter);
app.use('/api/movies', moviesRouter);
app.use('/api/rentals', rentalsRouter);
app.use('/api/users', userRouter);


const port = process.env.PORT || 3000;
app.listen(port, "localhost", () => {
    console.log('listen on port '+ port);
})
