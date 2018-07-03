const express = require('express');
const Joi = require('joi');

let app = express();
app.use(express.json());

let genres = [
    {id: '1', name: 'comedy'},
    {id: '2', name: 'drama'}
]

process.PORT = 3000;

app.get('/api/ganres', (req, res) => {
    res.send(genres);
});

app.get('/api/ganres/:id', (req, res) => {
    const ganre = genres.find((el) => el.id === req.params.id);

    if (!ganre) return res.status(404).send('not found');
    
    res.send(ganre);
})

app.post('/api/ganres', (req,res) => {

    const result = validateGanre(req.body)
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const genre = {id: (genres.length +1).toString(), name: req.body.name};
    genres = [...genres, genre]
    res.send(genre);

})


app.put('/api/ganres/:id', (req, res) => {
    let ganre = genres.find((el) => el.id === req.params.id);
    if (!ganre) return res.status(404).send('not found');

    const {error} = validateGanre(req.body)
    if(error) return res.status(400).send(error.details[0].message);

    ganre.name = req.body.name;
    genres.map((el) => el.id === req.params.id ? {...el, name: req.body.name } : el );
    res.send(ganre);
})


app.delete('/api/ganres/:id', (req, res)=> {
    let ganre = genres.find((el) => el.id === req.params.id);
    if (!ganre) return res.status(404).send('not found');

    const index = genres.indexOf(ganre);
    genres.splice(index, 1);

    res.send(ganre);

})



const port = process.env.PORT || 3000;
app.listen(port, "localhost", () => {
    console.log('listen on port '+ port);
})


function validateGanre(ganre) {
    const schema = {
      name: Joi.string().min(3).required()
    }
    return Joi.validate(ganre, schema);
}