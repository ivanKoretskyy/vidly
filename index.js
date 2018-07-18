const express = require('express');

const app = express();
require('./startup/dbconnection')();
require('./startup/logger')();
require('./startup/routes')(app);
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

const port = process.env.PORT || 3000;
app.listen(port, "localhost", () => {
    console.log('listen on port '+ port);
})
