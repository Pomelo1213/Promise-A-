let Promise = require('./promise.js')

let p = new Promise((resolve, reject) => {
  console.log('start')
  resolve(10)
})
p.then((resolve) => {
  console.log('first--->>', resolve)
  return 1
})
.then((resolve) => {
  console.log('second--->>', resolve)
}, (reject) => {
  console.log(reject)
})