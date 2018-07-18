const express = require('express');

const app = express();
require('./startup/logger')();
require('./startup/routes')(app);
require('./startup/dbconnection')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, "localhost", () => {
    console.log('listen on port '+ port);
})
