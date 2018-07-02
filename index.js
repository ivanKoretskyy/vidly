const express = require('express');

let app = express();
//app.use(express.json);

const genres = [
    {id: 1, name: 'comedy'},
    {id: 2, name: 'drama'}
]

process.PORT = 3000;

app.get('/ganres', (req, res) => {
    res.send(genres);
})

app.post('/ganres', (req,res) => {
    const genre = req.body;
    genres = [...genres, genre]
    res.send(genre);

})
const port = process.env.PORT || 3000;
app.listen(port, "localhost", () => {
    console.log('listen on port '+ port);
})