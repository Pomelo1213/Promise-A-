let Promise = require('./promise.js')

let p = new Promise((resolve, reject) => {
  reject(10)
})
p.then((resolve) => {
  console.log('resolve')
}, (reject) => {
  console.log('reject')
})