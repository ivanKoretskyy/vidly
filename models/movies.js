const Joi = require('joi');
const mongoose  = require('mongoose');
const {ganresSchema} = require('./ganre');

const movieSchema = new mongoose.Schema({
    "title": {
        type: String,
        required: true,
        maxlength: 255,
        trim: true

    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type:Number,
        min: 0,
        max: 255,
        required: true
    },
    ganre: {
        type: ganresSchema,
        required: true
    }
});

const movieModel = mongoose.model('Movie',movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required(),
        ganreId: Joi.objectId()
    }
    return Joi.validate(movie, schema)
}

exports.validateMovie = validateMovie;
exports.movieModel = movieModel;