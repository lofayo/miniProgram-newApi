// pages/movie/movie-search/movie-search.js
const movie = require('../common.js')
const movie_search_api = movie.movie_search_api
const addStarArray = movie.addStarArray
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 显示搜索结果
   */
  searching: function (e) {
    let _this = this
    let searchKey = e.detail.value
    wx.showLoading({
      title: 'loading',
    })
    wx.request({
      url: movie_search_api + searchKey,
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        let subjects = res.data.subjects
        addStarArray(subjects)
        _this.setData({
          searchData: subjects
        }, () => {
          wx.hideLoading()
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