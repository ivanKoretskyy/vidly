
const Joi = require('joi');
const mongoose = require('mongoose');

  const customersSchema = new mongoose.Schema({
    "name": {"type": String, "required": true},
    "phone": {"type": String, "required": false},
    "isGold": {"type": Boolean, "default": false}
  })

  const CustomerModel = mongoose.model('Customer', customersSchema);

  
function validateCustomer(customer) {
    const schema = {
      name: Joi.string().min(2).required(),
      phone: Joi.string(),
      isGold: Joi.boolean()
    }
    return Joi.validate(customer, schema);
  }
  exports.validateCustomer = validateCustomer;
  exports.CustomerModel = CustomerModel;