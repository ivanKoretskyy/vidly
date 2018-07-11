const express = require('express');
const logger  = require('./middleware/logger');
const ganresRouter = require('./router/ganres');
const customersRouter = require('./router/customers');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/vidly")
  .then(_ => console.log('connect to mongo success '))
  .catch(err => console.log(err));
const app = express();
app.use(express.json());

app.use(express.static('public')); // serve static files

app.use('/api/ganres',ganresRouter);
app.use('/api/customers',customersRouter);

const port = process.env.PORT || 3000;
app.listen(port, "localhost", () => {
    console.log('listen on port '+ port);
})
