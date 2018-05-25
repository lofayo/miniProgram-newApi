// pages/movie/movie-lists/movie-lists.js
const movie = require('../common.js')
const api = movie.api
const requestUrl = movie.requestUrl
const addStarArray = movie.addStarArray

// 全局变量记录下拉刷新时数据初始值
let requestStart = 18

// 当前页面请求数据的URL
let url = ''



Page({
  /**
   * 页面的初始数据
   */
  data: {
    subjects: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let url_id = options.url_id
    url = api[url_id].url +'?count=18'
    
    requestUrl(url,(resData)=>{
      wx.setNavigationBarTitle({
        title: resData.title,
      })
      let subjects = resData.subjects
      addStarArray(subjects)
      _this.setData({
        subjects:subjects
      },()=>{
        wx.hideLoading()
      })
    })
  },
  /**
   * 页面上拉触底事件的处理函数（上拉加载）
   */
  onReachBottom: function () {
    let _this = this
    let queryUrl = url + '&start=' + requestStart
    console.log(queryUrl)
    requestUrl(queryUrl,(resData)=>{
      console.log(resData)
      let newSubjects = resData.subjects
      if (newSubjects.length !== 0) {
        addStarArray(newSubjects)
        _this.setData({
          subjects:[..._this.data.subjects,...newSubjects]
        },()=>{
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
  }
})