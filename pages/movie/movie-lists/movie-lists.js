// pages/movie/movie-lists/movie-lists.js
const movie = require('../common.js')
const api = movie.api
const addStarArray = movie.addStarArray

// 全局变量记录下拉刷新时数据初始值
let requestStart = 0

// 当前页面请求数据的URL
let url = ''



Page({
  //请求当前url接口所有数据
  requestItemApi: function (url) {
    let _this = this
    let initSubjects = _this.data.subjects

    let currentQueryUrl = url + '?start=' + requestStart
    requestStart += 20
    wx.request({
      url: currentQueryUrl,
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        if (res.data.count === 0) {
          wx.showToast({
            title: '已全部更新',
          })
        } else {
          wx.showLoading({
            title: 'loading',
            mask: true
          })
          let subjects = res.data.subjects
          addStarArray(subjects)
          _this.setData({
            subjects: [...subjects, ...initSubjects]
          }, () => {
            wx.hideLoading()
            wx.stopPullDownRefresh()
          })
        }
      }
    })
  },

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
    let url_id = options.url_id
    url = api[url_id].url

    let category_name = options.category_name
    wx.setNavigationBarTitle({
      title: category_name
    })
    this.requestItemApi(url)
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
   * 页面相关事件处理函数--监听用户下拉动作（下拉刷新）
   */
  onPullDownRefresh: function () {
    this.requestItemApi(url)
  },

  /**
   * 页面上拉触底事件的处理函数（上拉加载）
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

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