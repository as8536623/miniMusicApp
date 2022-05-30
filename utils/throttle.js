export function throttle(fn,deplay,options = {leading: true,trailing:true},restecallback) {
  const { leading, trailing } = options
  let lastTime = 0
  let timer = null
  const _throttle = function (...args) {
    return new Promise((resolve, reject) => {
      const nowTime = new Date().getTime()
      if(lastTime === 0 && leading === false) lastTime = nowTime
      const timeDifference = deplay - (nowTime - lastTime)
      if(timeDifference <= 0){
        if(timer){
          clearTimeout(timer)
          timer = null
        }
        const result = fn.apply(this,args)
        lastTime = nowTime
        if(restecallback) restecallback(result)
        resolve(result)
      }
      if(trailing && !timer){
        timer = setTimeout(()=>{
          timer = null
          lastTime = !trailing ? 0 :new Date().getTime()
          const result = fn.apply(this,args)
          if(restecallback) restecallback(result)
          resolve(result)
        },timeDifference)
      }
    })
  }
  _throttle.cancel = function () {
    if(timer) clearTimeout(timer)
    timer = null
    lastTime = 0
  }
  return _throttle
}
