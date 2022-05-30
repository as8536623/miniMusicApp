export default function debounce(fn,depay,leading = false,restbackFn) {
    let timer = null
    let switchs = false
    const _debounce = function (...args) {
        return new Promise((resolve, reject) => {
            /*var args = arguments*/
            if(timer) clearTimeout(timer)
            if(leading && !switchs){
                const result = fn.apply(this,args)
                if(restbackFn) restbackFn(result)
                resolve(result)
                switchs = true

            }else{
                timer = setTimeout(() => {
                    const result = fn.apply(this,args)
                    if(restbackFn) restbackFn(result)
                    resolve(result)
                    switchs = false
                    timer = null
                },depay)
            }
        })

    }
    _debounce.cancel = function () {
        if(timer) clearTimeout(timer)
        switchs = false
        timer = null
    }
    return _debounce
}