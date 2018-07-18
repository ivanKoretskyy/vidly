const mongoose = require('mongoose');
module.exports = function() {

 // mongoose.connect("mongodb://localhost:27017/vidly")
  mongoose.connect(`mongodb://ivanKoretskyy:verynua223305@ds227110.mlab.com:27110/vidly`)
  .then(_ => console.log('connect to mongo success '))
}