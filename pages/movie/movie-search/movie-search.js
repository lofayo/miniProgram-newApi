// pages/movie/movie-search/movie-search.js
const movie = require('../common.js')
const movie_search_api = movie.movie_search_api
const requestUrl = movie.requestUrl
const addStarArray = movie.addStarArray

const utils = require('../../../utils/util.js')
const storage = utils.storage

let requestStart = 18

let url = movie_search_api + '?count=18&q='

let searchKey = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    subjects: [],
    historySearch: [],
    showHistory: true
  },

  onLoad: function () {
    let _this = this
    storage.initStorage('historySearch', [])
  },

  /**
   * 显示搜索结果
   */
  searching: function (e) {
    let _this = this
    //1、 区分搜索关键字：来自输入框、历史搜索记录
    searchKey = e.detail.value || e.currentTarget.dataset.searchKey
    // 3、重置requestStart，因为一个页面可能搜索过多个关键字，并且每一个搜索结果都可能下拉刷新了
    requestStart = 18
    storage.setStorage('historySearch', searchKey)
    //2、不是 url = url +searchKey（其实方便了后续下拉刷新），因为每次搜索都必须重拼关键词
    let queryUrl = url + searchKey
    requestUrl(queryUrl, (resData) => {
      console.log(resData)
      wx.setNavigationBarTitle({
        title: resData.title,
      })
      let subjects = resData.subjects
      if (subjects.length !== 0) {
        addStarArray(subjects)
        _this.setData({
          subjects: subjects
        }, () => {
          wx.hideLoading()
        })
      } else {
        _this.setData({
          subjects: subjects
        })
        wx.hideLoading()
        wx.showToast({
          title: '搜索结果为空',
        })
      }
    })
  },

  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    let _this = this
    let queryUrl = url + searchKey + '&start=' + requestStart
    console.log(queryUrl)
    requestUrl(queryUrl, (resData) => {
      let newSubjects = resData.subjects
      if (newSubjects.length !== 0) {
        addStarArray(newSubjects)
        _this.setData({
          subjects: [..._this.data.subjects, ...newSubjects]
        }, () => {
          requestStart += 18
          wx.hideLoading()
        })
      } else {
        wx.hideLoading()
        wx.showToast({
          title: 'All loaded',
        })
      }
    })
  },


  /**
   * 进入电影详情页
   */
  toMovieSubject: function (e) {
    // console.log(e)
    let subject_id = e.currentTarget.dataset.subject_id
    wx.navigateTo({
      url: "/pages/movie/movie-subject/movie-subject?subject_id=" + subject_id,
    })
  },
  /**
 * 搜索框失焦
 */
  inputBlur: function () {
    this.setData({
      // showHistory: false
    })
  },
  /**
   * 搜索框聚焦
   */
  inputFocus: function () {
    let _this = this
    storage.getStorage('historySearch', (resData) => {
      _this.setData({
        showHistory: true,
        historySearch: resData
      })
    })
  }
})