
const config = require('config');

module.exports = function() {
  //make sure we have config from environment variables if no - exit
  if( !config.get('jwtPrivateKey')) {
    throw new Error('Fatal error: jwtPrivateKey not defined') 
  }
}