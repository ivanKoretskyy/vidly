const express = require('express');
const { CustomerModel, validateCustomer } = require('./../models/customers');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const customers = await CustomerModel.find({});
    res.send(customers)
  }
  catch(err) {
    res.send(error)
  }

});

router.get('/:id', async (req, res) => {
  try {
    const customer = await CustomerModel.findById(req.params.id);
    res.send(customer)
  }
  catch(err) {
    res.status(404).send('not found')
  }

})

router.post('/', async (req,res) => {
  const result = validateCustomer(req.body)
  if(result.error) return res.status(400).send(result.error.details[0].message);
  try {
    const customer = await CustomerModel.create({name: req.body.name}); 
    res.send(customer)
  }
  catch (err) {
    res.send(err)
  }
    
})

router.put('/:id', async (req, res) => {
  console.log('id: ',req.params.id);
  const {error} = validateCustomer(req.body)
  if(error) return res.status(400).send(error.details[0].message);

  const customer = await CustomerModel.findByIdAndUpdate(req.params.id, 
    { 
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    }, { new: true });
  if (!customer) return res.status(404).send('not found');

  res.send(customer);
})

router.delete('/:id', async (req, res)=> {
  try {
   const customer = await CustomerModel.findByIdAndRemove(req.params.id);
   res.send(customer)
  }
  catch(err) {
    res.status(404).send('not found')
  }
})

module.exports = router;