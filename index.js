let Promise = require('./promise.js')

let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(10)
  },1000)
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