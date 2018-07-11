const express = require('express');
const router = express.Router();
const { GanreModel, validateGanre } = require('./../models/ganre');

router.get('/', async (req, res) => {
  try {
    const ganres = await GanreModel.find({});
    res.send(ganres)
  }
  catch(err) {
    res.send(error)
  }

});

router.get('/:id', async (req, res) => {
  try {
    const ganre = await GanreModel.findById(req.params.id);
    res.send(ganre)
  }
  catch(err) {
    res.status(404).send('not found')
  }

})

router.post('/', async (req,res) => {
  const result = validateGanre(req.body)
  if(result.error) return res.status(400).send(result.error.details[0].message);
  try {
    const ganre = await GanreModel.create({name: req.body.name}); 
    res.send(ganre)
  }
  catch (err) {
    res.send(err)
  }
    
})

router.put('/:id', async (req, res) => {
  console.log('id: ',req.params.id);
  const ganre = await GanreModel.findById(req.params.id);
  if (!ganre) return res.status(404).send('not found');

  const {error} = validateGanre(req.body)
  if(error) return res.status(400).send(error.details[0].message);

  ganre.name = req.body.name;
  const save = ganre.save();
  res.send(ganre);
})

router.delete('/:id', async (req, res)=> {
  try {
   const ganre = await GanreModel.findByIdAndRemove(id);
   res.send(ganre)
  }
  catch(err) {
    res.status(404).send('not found')
  }
})

module.exports = router;