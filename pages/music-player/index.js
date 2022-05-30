// pages/music-player/index.js
import { getMusicPlayerData,getMusicPlayerLyric } from "../../server/api_player"
import appInstance from "../../utils/globalApp"
import { lyricIfo } from "../../utils/lyric"
import appAudioContext from "../../store/appAudio"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicId:0,
    musicInfo: {},
    duration:0,
    currentTime: 0,

    lyricInfo:'',
    lyricIndex:0,
    lyric:[],

    silderValue:0,
    lyricScrollTop: 0,
    dragging: false,
    playState: 'pause',
    active: 0,
    statusBarHeight: 0,
    screenWidth:0,
    screenHeight:0,
    surplusHeight: 0,
    proportion:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const ids = options.ids
    const statusBarHeight = appInstance.globalData.statusBarHeight
    const screenWidth = appInstance.globalData.screenWidth
    const screenHeight = appInstance.globalData.screenHeight
    const surplusHeight = screenHeight - statusBarHeight - 44
    const proportion = appInstance.globalData.proportion
    this.getMusicPlayerData(ids)
    this.getMusicPlayerLyricData(ids)
    this.setData({musicId:ids,statusBarHeight,screenWidth,screenHeight,surplusHeight,proportion})

    /*播放器事件*/
    appAudioContext.src = `https://music.163.com/song/media/outer/url?id=${ids}.mp3`
    appAudioContext.autoplay = false
    appAudioContext.title = ids

    appAudioContext.onCanplay(()=>{
      appAudioContext.play()
    })
    appAudioContext.onTimeUpdate(()=>{
      /*获取歌曲总时长-毫秒单位*/
      const duration = this.data.musicInfo.dt
      /*当前播放时长-毫秒单位*/
      const currentTime = appAudioContext.currentTime * 1000
      /*滑动数值 百分比值*/
      const silderValue = currentTime / duration * 100
      if(!this.data.dragging){
        const lyrics = this.data.lyric
        let i = 0
        for (; i < lyrics.length; i++){
          const lyricData = lyrics[i]
          if(currentTime < lyricData.time){
            break;
          }
        }
        const lyricIndex = i - 1
        if(this.data.lyricIndex !== lyricIndex){
          this.setData({lyricIndex,lyricInfo:lyrics[lyricIndex].instantLyrics, lyricScrollTop: lyricIndex * 35})
        }
        this.setData({currentTime,duration,silderValue})
      }
    })
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
  /*返回上一页*/
  goBackPrevPage: function(){
    const page = getCurrentPages()
    if(page.length < 1) return
    wx.navigateBack({
      delta: 1
    })
  },
  /*获取歌曲信息*/
  getMusicPlayerData: function (ids) {
    getMusicPlayerData(ids).then(res=>{
      this.setData({musicInfo:res.songs[0]})
    })
  },
  getMusicPlayerLyricData: function(id){
    getMusicPlayerLyric(id).then(res=>{
      const lyric = res.lrc.lyric
      const lyricInfos = lyricIfo(lyric)
      this.setData({lyric:lyricInfos})
    })
  },
  /*滑块改变时触发*/
  swiperChange: function (event) {
    const swiperCurrent = event.detail.current
    this.setData({active:swiperCurrent})
  },
  /*完成一次拖动后触发的事件*/
  sliderOnechange: function (event) {
    const silderValue =  event.detail.value
    const currentTime = silderValue / 100 * this.data.duration
    /*跳转到指定位置*/
    appAudioContext.seek(currentTime / 1000)
    /*监听跳转后进行暂停*/
    appAudioContext.onSeeked(()=>{
      appAudioContext.pause()
    })
    this.setData({currentTime,silderValue,dragging:false})
  },
  /*拖动过程中触发的事件*/
  slideringchange: function(event){
    this.setData({dragging:true})
  },
  /*暂停和播放音乐*/
  handlePlayBtnClick: function () {
    if(this.data.playState == 'resume'){
      appAudioContext.play()
      this.setData({playState: 'pause'})
    }else if(this.data.playState == 'pause'){
      appAudioContext.pause()
      this.setData({playState: 'resume'})
    }
  },
  /*swiper点击切换*/
  swiperBtn: function (event) {
    const active = event.currentTarget.dataset.hover
    this.setData({active})
  },
  /*滑动开始事件*/
  startScroll: function (event) {
    this.setData({dragging:true})
  },
  /*滑动结束事件*/
  endScroll:function (event) {
    /*获得滑动歌词的序号*/
    const lyricIndex = Math.floor(event.detail.scrollTop / 35)
    /*获取滑动歌词的时间*/
    const currentTime = this.data.lyric[lyricIndex].time
    /*获取滑动位置的歌词*/
    const lyricInfo = this.data.lyric[lyricIndex].instantLyrics
    /*改变silder进度条数据*/
    const silderValue = currentTime / this.data.duration *100
    /*跳转到指定位置*/
    appAudioContext.seek(currentTime / 1000)
    appAudioContext.onSeeked(()=>{
      appAudioContext.pause()
    })
    this.setData({currentTime,lyricIndex,silderValue,lyricInfo,dragging:false})
  }
})
