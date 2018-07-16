const bcrypt = require('bcrypt');

async function genSalt() {
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash('123',salt)
  console.log(password);
}
genSalt()