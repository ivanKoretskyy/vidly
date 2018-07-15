const express = require('express');
const router = express.Router();
const {movieModel, validateMovie} = require('./../models/movies');
const { GanreModel } = require('./../models/ganre');


router.get('/', async (req, res) =>{
    try{
        const movies = await movieModel.find();
        res.send(movies);
    }
    catch(ex) {
        res.send(ex);
    }
});

router.get('/:id', async (req, res) => {
    const movie = await movieModel.findById(req.params.id)

    if(!movie) return res.status(404).send('movie with this id not found');

    res.send(movie);
})

router.post('/', async(req,res) => {
    const result = validateMovie(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const ganre = await GanreModel.findById(req.body.ganreId);
    if(!ganre) return res.status(400).send('ivalid ganre id');

    const movie = new movieModel({
        title: req.body.title,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        ganre: {
            _id: ganre._id,
            name: ganre.name
        }
    });
    try {
    await movie.save();
    res.send(movie)
    }
    catch(err){
        res.send(err)
    }
})

router.put('/:id', async(req,res) => {
    const result = validateMovie(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const ganre = await GanreModel.findById(req.body.ganreId);
    if (!ganre) return res.status(403).send('not found ganre');

    const movie = await movieModel.findByIdAndUpdate(req.params.id,
    {
        title: req.body.title,
        ganre: {
            _id: ganre._id,
            name: ganre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {new: true}
    )

    if (!movie) return res.status(404).send('the movie with this id not found');

    res.send(movie)

})

router.delete('/:id', async(req,res) => {
    const movie = await movieModel.findByIdAndRemove(req.params.id);
    if(!movie) return res.status(404).send('movie with this id not found');

    res.send(movie);
})

module.exports = router;    