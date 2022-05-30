// components/detial-musicList/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemInfo:{
      type: Object,
      value:{}
    },
    index:{
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    /*跳转到歌曲播放页*/
    goMusicPlayer: function (event) {
      const ids = event.currentTarget.dataset.ids
      wx.navigateTo({
        url:`/pages/music-player/index?ids=${ids}`
      })
    }
  }
})
