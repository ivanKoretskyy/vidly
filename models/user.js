const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: false,
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
  },
  firstName: {
    type: String,
    required: true,
    maxlength: 255
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 255
  },
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    config.get("jwtPrivateKey")
  );
};

const userModel = mongoose.model("User", userSchema);

const validateUser = function(user) {
  const userSchema = {
    name: Joi.string().required(),
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string().required()
  };
  return Joi.validate(user, userSchema);
};

exports.validateUser = validateUser;
exports.userModel = userModel;
