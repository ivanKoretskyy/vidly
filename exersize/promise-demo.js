

const p  = new Promise((resolve, reject) => {
  setTimeout(()=> {
    console.log('get user from db...');
    reject(new Error('error message'))
  },3000)
})

p.then(
  value => {console.log('value ', value)}
  , error => {console.log('error ', error)}
).catch(reason => {console.log('reason: ', reason)})