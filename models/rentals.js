const Joi = require('joi');
const mongoose = require('mongoose');


const rentalsSchema = new mongoose.Schema({
    customer: 
    {
        type: new mongoose.Schema({
            name:{
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: false
            },
            isGold: {
            type: Boolean,
            default: false 
            }
        }),
        required: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true
            },
            dailyRentalRate: {
                type: Number,
                required: true,
                min: 0
            }

        }),
        required: true
    },
    dateOut: {
        type: Date,
        default: Date.now
    },
    dateReturned: {
        type: Date
    }
});

const rentalModel = mongoose.model('Rental', rentalsSchema);

function validateRental(rental) {
    const rentalApiSchema = {
        movieId: Joi.objectId().required(),
        CustomerId: Joi.objectId().required(),
        dateOut: Joi.date(),
        dateReturned: Joi.date()
    }
    return Joi.validate(rental,rentalApiSchema)
}

exports.validateRental = validateRental;
exports.rentalModel = rentalModel;