// pages/article/article.js

const data = require('../data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    articleLists: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      articleLists:data.data
    })
    // wx.showShareMenu({
    //   withShareTicket:true
    // })
    // wx.hideShareMenu()
    // wx.showShareMenu()
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('转发来自页面按钮：',res.target)
    }
    if (res.from === 'menu') {
      // 来自右上角转发菜单
      console.log('转发来自右上角转发菜单')
    }
    return {
      title: '电影小程序',
      imageUrl:'http://pic29.photophoto.cn/20131204/0034034499213463_b.jpg'
    }
  },

  /**
   * 进入文章内容页面
   */
  toArticleContent: function (e) {
    var articleID = e.currentTarget.dataset.article_id;
    wx.navigateTo({
      url: '/pages/article/article-content/article-content?articleID='+articleID
    })
  }
})