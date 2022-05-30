const BASE_URL = "http://123.207.32.32:9001"
class HYRequest{
  constructor(){

  }
  request(url,method,parmas){
    return new Promise((resolve, reject) =>{
      wx.request({
        url: BASE_URL+url,
        data: parmas,
        method: method,
        success(res) {
          resolve(res.data)
        },
        fail(err) {
          reject(err)
        }
      })
    })
  }
  get(url, params){
   return this.request(url,"GET",params)
  }
  post(url,params){
    return this.request(url,"POST",params)
  }
}
const hyRequest = new HYRequest()
export default hyRequest