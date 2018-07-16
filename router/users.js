const { userModel, validateUser } = require('../models/user');
const _ =require('lodash');
const bcrypt = require('bcrypt');

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');



router.get('/', async (req,res) => {
  const users = await userModel.find()
  res.send(users);
});

router.post('/', async (req, res) => {
  const result = validateUser(req.body);
  if (result.error) return res.status(400).send(result.error.details[0].message)

  let user = new userModel(  _.pick(req.body, ['name', 'email', 'password']));
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(req.body.password, salt);
  user.password = password;
  user =  await user.save();

  res.send(user);

})

router.post('/login', async (req, res) => {debugger;
  const user = await userModel.findOne({"email": req.body.email})
  if (!user) return res.status(400).send('not correct email/password pair');

  const validPassword  = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('ivalid email or password')
  
  const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));

  res.send(token);
})


module.exports = router;