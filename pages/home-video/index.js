// pages/home-video/index.js
import { getTopVideo } from '../../server/api_video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topMvs: [],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function (options) {
    this.getDateList(0)
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
  onPullDownRefresh:async function () {
    this.getDateList(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    this.getDateList(this.data.topMvs.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getDateList: async function(offset){
    if(!this.data.hasMore && offset !== 0) return
    wx.showNavigationBarLoading()
    const res = await getTopVideo(offset)
    if(offset === 0){
      wx.stopPullDownRefresh()
      this.setData({topMvs:res.data})
    }else{
      this.setData({topMvs:this.data.topMvs.concat(res.data)})
    }

    this.setData({hasMore: res.hasMore})
    wx.hideNavigationBarLoading()
  },
  detialView: function (event) {
    const id = event.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `/pages/video-detial/index?id=${id}`
    })
  }
})