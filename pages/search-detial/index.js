// pages/search-detial/index.js
import { getSearchHotData,getSearchSuggestionsData,getSearchResultData } from '../../server/api_search'
import debounce from "../../utils/debounce"
import searchKey from "../../utils/search-keyword"
const searchDebounce = debounce(getSearchSuggestionsData,200)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchListData:{},
    isSearch: '',
    searchSuggestionsData:{},
    searchResult:{},
    searchKeyNode:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSearchData()
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
  getSearchData: function () {
    getSearchHotData().then(res=>{
      this.setData({searchListData:res.result.hots})
    })
  },
  searchKeyWords: function (event) {
    this.setData({searchResult: {}})

    /*获取搜索关键词*/
    const searchKeyWords = event.detail

    /*设置搜索关键词*/
    this.setData({isSearch:searchKeyWords})

    /*关键词为空 return*/
    if(!searchKeyWords) return

    /*防抖发送请求获取关键词拿到的数据*/
    searchDebounce(searchKeyWords).then(res=>{
      const songsLists = res.result.songs
      const searchKeyWords = this.data.isSearch
      this.setData({searchSuggestionsData:songsLists})

      /*引入匹配关键词展示不同样式js*/
      const searchKeyNodes = searchKey(songsLists,searchKeyWords)
      this.setData({searchKeyNode:searchKeyNodes})
    })
  },
  handleTagClick: function (event) {
    /*获取点击的歌曲名字*/
    const keyword = event.currentTarget.dataset.value
    this.setData({isSearch:keyword})

    /*发送获取歌曲网络请求*/
    this.getSearchCommon(keyword)
  },
  searchKeyWordsResult: function () {
    const keyword = this.data.isSearch
    this.getSearchCommon(keyword)
  },
  getSearchCommon: function (keyword) {
    this.setData({searchSuggestionsData: {}})
    getSearchResultData(keyword).then(res=>{
      this.setData({searchResult:res.result.songs})
    })
  }
})