const express = require('express');
const logger  = require('./middleware/logger');
const ganresRouter = require('./router/ganres');

const app = express();
app.use(express.json());

app.use(express.static('public')); // serve static files

app.use('/api/ganres',ganresRouter);

const port = process.env.PORT || 3000;
app.listen(port, "localhost", () => {
    console.log('listen on port '+ port);
})
