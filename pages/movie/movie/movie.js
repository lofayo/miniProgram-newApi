const movie = require('../common.js')
const api = movie.api
const addStarArray = movie.addStarArray
/**
 * 请求Api的回调，对请求数据的处理
 * @method handleData
 * @param {string} category 设置请求数据的类型
 * @param {array} subjects 请求结果的数组对象
 * @param {this} 当前页面this对象 当前页面this对象
 * @return {undefined} 
 * eg:handleData('in_theaters', [], _this)
 */
let tempArray = []
function handleData(url_id, categroy, subjects, _this) {
  addStarArray(subjects)
  let tempJson = {}
  tempJson['name'] = categroy
  tempJson['url_id'] = url_id
  tempJson['subjects'] = subjects
  tempArray.push(tempJson)
  _this.setData({
    moviesData: tempArray
  })
}
/**
 * 请求分类数据的url
 * @method requestCategoryApi
 * @param {string} url 请求url
 * @param {string} category 请求数据类型，用于设置请求数据类型
 * @param {this} 当前页面this对象 当前页面this对象
 * @return {undefined} 
 * eg:requestCategoryApi('https://douban.uieee.com/v2/movie/in_theaters', 'in_theaters',this)
 */
function requestCategoryApi(url, url_id, category, _this) {
  wx.request({
    url: url,
    header: {
      'content-type': 'json'
    },
    success: function (res) {
      handleData(url_id, category, res.data.subjects, _this)
    }
  })
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesData: []
  },
  onTabItemTap: function (item) {
    console.log(item.index)
    console.log(item.pagePath)
    console.log(item.text)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for (let i = 0; i < 3; i++) {
      let url = api[i].url + '?start=0&count=3'
      requestCategoryApi(url, i, api[i].category, this)
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
  onPullDownRefresh: function () { },

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
   * 进入电影列表页面
   */
  toMovieLists: function (e) {
    let url_id = e.currentTarget.dataset.url_id
    let category_name = e.currentTarget.dataset.category_name
    wx.navigateTo({
      url: "/pages/movie/movie-lists/movie-lists?url_id=" + url_id + '&category_name=' + category_name,
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
   * 进入电影搜索页
   */
  toSearchPage: function () {
    wx.navigateTo({
      url: "/pages/movie/movie-search/movie-search"
    })
  }
})