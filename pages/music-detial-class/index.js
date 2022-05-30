// pages/music-detial-class/index.js
import {getHotMusicData, getSongListClassification} from '../../server/api_music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songMenuList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSongClass()
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
  async getSongClass(){
    const res = await getSongListClassification()
    const tags = res.tags
    const songMenuList = []
    const promises = []
    for(const index in tags){
      const tagsName = tags[index].name
      songMenuList.push({tagsName,list:[]})
      promises.push(getHotMusicData(tagsName))
    }
    Promise.all(promises).then(menuLists => {
      for(const index in menuLists){
        const playlists = menuLists[index].playlists
        const tag = menuLists[index].cat
        if(songMenuList[index].tagsName !== tag) return
        songMenuList[index].list = playlists
      }
      this.setData({songMenuList:songMenuList})
    })
  }
})