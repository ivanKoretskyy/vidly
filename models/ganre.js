
const Joi = require('joi');
const mongoose = require('mongoose');

  const ganresSchema = new mongoose.Schema({
    "name": {"type": String, "required": true}
  })

  const GanreModel = mongoose.model('Ganre', ganresSchema);


function validateGanre(ganre) {
    const schema = {
      name: Joi.string().min(3).required()
    }
    return Joi.validate(ganre, schema);
  }
  
  exports.validateGanre = validateGanre;
  exports.GanreModel = GanreModel;
  exports.ganresSchema =ganresSchema;