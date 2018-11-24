const PEDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise{
  constructor(executor){
    let self = this
    self.status = PEDING
    self.value = undefined
    self.reason = undefined
    //如果是个异步的情况，那么then会在resolve之前执行，所以使用发布订阅解决
    self.onResolveCB = []
    self.onRejectCB = []
    let resolve = (value) => {
      if (self.status === PEDING) {
        self.value = value
        self.status = FULFILLED
        self.onResolveCB.forEach(item => item(self.value))
      }
    }
    let reject = (reason) => {
      if (self.status === PEDING) {
        self.reason = reason
        self.status = REJECTED
        self.onRejectCB.forEach(item => item(self.reason))
      }
    }
    try {
      return executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onResolve, onReject){
    let self = this 
    if (self.status === FULFILLED) {
      return new Promise((resolve, reject) => {
        let x = onResolve(self.value)
        resolve(x)
      })
    }
    if (self.status === REJECTED) {
      return new Promise((resolve, reject) => {
        let x = onReject(self.reason)
        reject(x)
      })
    }
    if (self.status === PEDING){
      return new Promise((resolve, reject) => {
        self.onResolveCB.push(() => {
          let x = onResolve(self.value)
          resolve(x)
        })
        self.onRejectCB.push(() => {
          let x = onReject(self.reason)
          reject(x)
        })
      })
    }
  }
}

module.exports = Promise