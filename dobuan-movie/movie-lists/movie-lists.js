// dobuan-movie/movie-lists/movie-lists.js
const common = require('../common.js')
const addStarArray = common.addStarArray

// 全局变量记录下拉刷新时数据初始值
let requestStart = 0

// 记录当前页面的分类id
let category_id = 0

// 当前页面请求数据的URL
let url = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
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
    var _this = this
    category_id = options.category_id
    let category = options.category
    wx.setNavigationBarTitle({
      title: category
    })
    // 提取movies数据的stars字段，转成能直接渲染的star

    url = common.API[category_id].url
    wx.request({
      url: url,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var subjects = res.data.subjects
        addStarArray(subjects)
        _this.setData({
          movies: subjects
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
   * 页面相关事件处理函数--监听用户下拉动作（下拉刷新）
   */
  onPullDownRefresh: function () {
    let _this = this
    let initData = this.data.movies
    requestStart += 20
    wx.request({
      url: url + '?start=' + requestStart,
      header: {
        'content-type': 'application/json' // 默认值
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
            movies: [...subjects,...initData]
          },()=>{
            wx.hideLoading()
            wx.stopPullDownRefresh()
          })
        }
      }
    })
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
      url: "/dobuan-movie/movie-subject/movie-subject?subject_id=" + subject_id,
    })
  }
})