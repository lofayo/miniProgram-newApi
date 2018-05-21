// dobuan-movie/movie-subject/movie-subject.js
const movie = require('../common.js')
const movie_subject_api = movie.movie_subject_api
const addStarArray = movie.addStarArray

Page({

  /**
   * 页面的初始数据
   */
  data: {
    subject:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let subject_id = options.subject_id
    wx.request({
      url: movie_subject_api+subject_id,
      header: {
        'content-type': 'json' // 默认值
      },
      success:function(res){
        let subject = res.data
        console.log(subject)
        addStarArray(subject)
        wx.setNavigationBarTitle({
          title: subject.title
        })
        _this.setData({
          subject: subject
        })
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
  
  }
})