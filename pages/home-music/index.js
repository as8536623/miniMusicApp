// pages/home-music/index.js
import { getBannerImg, getHotMusicData } from '../../server/api_music'
import { throttle } from '../../utils/throttle'
import queryRect from '../../utils/query-rect'
import { eventStore,musicResMap } from '../../store/index'
const throttleImgHeight = throttle(queryRect,2000)
Page({
  /**
   * 页面的初始数据
   */
  data: {
    homeMusicBanner: {},
    imageHeight: 0,
    songRecommendation:[],
    hotMusicLists:[],
    recommendLists: [],
    rangMap: {
      1: {} ,
      2: {},
      3: {}
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getBannerImg().then(res=>{
      this.setData({homeMusicBanner: res.banners})
    })

    /*获取歌曲推荐*/
    eventStore.dispatch('getMusicData')
    eventStore.onState("songRecommendation", (value) => {
      if(!value.tracks) return
      this.setData({songRecommendation:value.tracks.slice(0,6)})
    })

    /*获取热门歌单和获取推荐歌单*/
    this.getHotMusic()
    /*获取巅峰榜*/
    eventStore.onState("hotMusic", this.getRankingData(1))
    eventStore.onState("originalMusic", this.getRankingData(2))
    eventStore.onState("soarMusic", this.getRankingData(3))
    /*eventStore.onState("hotMusic", (value) => {
      if(!value.tracks) return
      this.setData({hotMusicList:value.tracks.slice(0,3)})
    })*/
   /* eventStore.onState("originalMusic", (value) => {
      if(!value.tracks) return
      this.setData({originalMusicList:value.tracks.slice(0,3)})
    })*/
   /* eventStore.onState("soarMusic", (value) => {
      if(!value.tracks) return
      this.setData({soarMusicList:value.tracks.slice(0,3)})
    })*/
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
  /*动态设置首页轮播图图片的高度*/
  loadingImgHeight: function () {
    throttleImgHeight('#imageEvent').then(res => {
      this.setData({imageHeight:res[0].height})
    })
  },
  /*获取热门歌曲数据*/
  getHotMusic: function(){
    getHotMusicData().then(res=>{
      this.setData({hotMusicLists:res.playlists})
    })
    getHotMusicData('华语').then(res=>{
      this.setData({recommendLists:res.playlists})
    })
  },
  /*获取巅峰榜歌单数据*/
  getRankingData:function(idx){
    return (res)=>{
     /* console.log(res)*/
      if(!res.tracks) return
      const endMusicList = { ...this.data.rangMap, [idx]:res }
      this.setData({rangMap:endMusicList})
    }
  },
  /*跳转到搜索页*/
  searchBtn: function () {
    wx.navigateTo({url:`/pages/search-detial/index`})
  },
  /*跳转到歌单列表*/
  goPeakMusicDetial: function (event) {
    const idx = event.currentTarget.dataset.idx
    const peakName = musicResMap[idx]
    const type = event.currentTarget.dataset.type
    wx.navigateTo({
      url:`/pages/music-detial/index?peakName=${peakName}&type=${type}`
    })
  },
  /*跳转到歌单详情页*/
  goSheetMusicDetial: function (event) {
    const idx = event.currentTarget.dataset.idx
    const type = event.currentTarget.dataset.type
    wx.navigateTo({
      url:`/pages/music-detial/index?id=${idx}&type=${type}`
    })
  },
  /*跳转到总歌单*/
  totalSongSheet: function () {
    wx.navigateTo({
      url:`/pages/music-detial-class/index`
    })
  },
  /*跳转到歌曲播放页*/
  goMusicPlayer: function (event) {
    const ids = event.currentTarget.dataset.ids
    wx.navigateTo({
      url:`/pages/music-player/index?ids=${ids}`
    })
  }
})
