const mongoose = require('mongoose');
module.exports = function() {
  mongoose.connect("mongodb://localhost:27017/vidly")
  .then(_ => console.log('connect to mongo success '))
}