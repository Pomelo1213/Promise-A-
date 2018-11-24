const PEDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise{
  constructor(executor){
    this.status = PEDING
    this.value = undefined
    this.reason = undefined
    //如果是个异步的情况，那么then会在resolve之前执行，所以使用发布订阅解决
    this.onResolveCB = []
    this.onRejectCB = []
    let resolve = (value) => {
      if (this.status === PEDING) {
        this.value = value
        this.status = FULFILLED
        this.onResolveCB.forEach(item => item(this.value))
      }
    }
    let reject = (reason) => {
      if (this.status === PEDING) {
        this.reason = reason
        this.status = REJECTED
        this.onRejectCB.forEach(item => item(this.reason))
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
    console.log(this)
    if (self.status === FULFILLED) {
      onResolve(self.value)
    }
    if (self.status === REJECTED) {
      onReject(self.reason)
    }
    if (self.status === PEDING){
      self.onResolveCB.push(onResolve)
      self.onRejectCB.push(onReject)
    }
  }
}

module.exports = Promise