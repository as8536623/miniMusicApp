// pages/video-detial/index.js
import { getMvUrl, getMvDetial, getMvRelated } from '../../server/api_video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvURl:{},
    mvDetial:{},
    mvRelated:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    const id = options.id
    this.getMvData(id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getMvData: function (id) {
    getMvUrl(id).then((res)=>{
      this.setData({ mvURl: res.data.url})
    })

    getMvDetial(id).then((res)=>{
      this.setData({ mvDetial: res.data})
    })

    getMvRelated(id).then((res)=>{
      this.setData({ mvRelated: res.data})
    })
  }
})