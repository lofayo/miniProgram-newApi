
const common = require('../common.js')
const addStarArray = common.addStarArray
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesCategory: [],
    star: [
      [0, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [1, 1, 1, 1, 0],
      [1, 1, 1, 1, 1]
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let tempArr = []
    let commonAPI = common.API
    let requestAPI = common.requestAPI

    for (let i = 0; i < commonAPI.length; i++) {
      wx.request({
        url: commonAPI[i].url + '?start=0&count=3',
        success: function (res) {
          console.log(res)
          let resData = res.data

          resData['category'] = commonAPI[i].category
          resData['category_id'] = i
          let subjects = resData.subjects
          addStarArray(subjects)
          tempArr.push(resData)
          _this.setData({
            moviesCategory: tempArr
          })
        }
      })
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

  /**
   * 进入电影子页面
   */
  toMovieLists: function (e) {
    // console.log(e)
    let category_id = e.currentTarget.dataset.category_id
    let category = e.currentTarget.dataset.category
    wx.navigateTo({
      url: "/pages/movie/movie-lists/movie-lists?category_id=" + category_id + '&category=' + category,
    })
  }
  ,

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