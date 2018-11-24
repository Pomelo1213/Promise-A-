let Promise = require('./promise.js')

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  })
})
p.then((resolve) => {
  console.log(resolve)
  console.log('finish')
}, (reject) => { 
  console.log(reject)
})