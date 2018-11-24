const PEDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise{
  constructor(executor){
    this.status = PEDING
    this.value = undefined
    this.reason = undefined
    let resolve = (value) => {
      if (this.status === PEDING) {
        this.value = value
        this.status = FULFILLED
      }
    }
    let reject = (reason) => {
      if (this.status === PEDING) {
        this.reason = reason
        this.status = REJECTED
      }
    }
    try {
      return executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
  then(onResolve, onReject){
    if (this.status === FULFILLED) {
      onResolve(this.value)
    }
    if (this.status === REJECTED) {
      onReject(this.reason)
    }
  }
}

module.exports = Promise