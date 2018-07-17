const { rentalModel, validateRental } = require('./../models/rentals');
const { movieModel } = require('./../models/movies');
const { CustomerModel } = require('./../models/customers');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const auth = require('./../middleware/auth');
//console.log('in rental')
router.get('/', async (req, res) => {
    console.log('get all rentals')
    const rentals = await rentalModel.find();
    res.send(rentals);
});

router.get('/:id', async (req, res) => {
    const rental = await rentalModel.find({_id: req.params.id});
    if (!rental) return res.status(404).send('rental with this id not found');

    res.send(rental);
});

router.post('/', auth, async function (req,res) {
    const result = validateRental(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const movie = await movieModel.findById(req.body.movieId);
    if (!movie) return res.status(400).send('movie with this id not found');
    if (movie.numberInStock === 0) return res.status(400).send('movie not in stock');

    const customer = await CustomerModel.findById(req.body.CustomerId);
    if (!customer) return res.status(400).send('customer with this id not found');

    let rental = new rentalModel({
        customer: {
          _id: customer._id,
          name: customer.name,
          phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        dateReturned: req.body.dateReturned
    })

    rental = await rental.save();
    movie.numberInStock--;
    movie.save();
    res.send(rental);
});

router.put('/:id', auth, async function (req,res) {

    const result = validateRental(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const movie = await movieModel.findById(req.body.movieId);
    if (!movie) return res.status(400).send('movie with this id not found');

    const customer = await CustomerModel.findById(req.body.CustomerId);
    if (!customer) return res.status(400).send('customer with this id not found');

    let rental = new rentalModel({
        customer: {
          _id: customer._id,
          name: customer.name,
          phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        },
        dateOut: req.body.dateOut,
        dateReturned: req.body.dateReturned
    })

    rental = await rentalModel.findByIdAndUpdate(req.params.id,rental);
    if(!rental) return res.status(404).send('cant find rental with this id');
    res.send(rental);
})

module.exports = router;