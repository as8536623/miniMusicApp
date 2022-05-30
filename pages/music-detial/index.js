// pages/music-detial/index.js
import { eventStore } from '../../store/index'
import { getSongSheetMusicData } from '../../server/api_music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicDataLists: {},
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const type = options.type
    this.setData({type:type})
    if(type === 'song'){
      /*从store中获取热歌榜、新歌榜、飙升榜、原创榜数据*/
      const peakName = options.peakName
      const songLists = eventStore.state[peakName]
      console.log(songLists)
      this.setData({musicDataLists:songLists})
    }else if(type === 'songsheet'){
      const songId = options.id
      this.getSongSheetMusicLists(songId)
    }
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
  /*获取歌单列表数据*/
  getSongSheetMusicLists: function (songId) {
    getSongSheetMusicData(songId).then(res=>{
      console.log(res)
      this.setData({musicDataLists:res.playlist})
    })
  }
})