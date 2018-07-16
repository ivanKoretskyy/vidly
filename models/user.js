const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    maxlength: 1024
  }
});

const userModel = mongoose.model('User',userSchema)


const validateUser = function(user) {
  const userSchema = {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
  }
  return Joi.validate(user,userSchema);
}







exports.validateUser = validateUser;
exports.userModel = userModel;