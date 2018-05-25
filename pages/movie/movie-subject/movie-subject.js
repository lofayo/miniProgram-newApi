// dobuan-movie/movie-subject/movie-subject.js
const movie = require('../common.js')
const movie_subject_api = movie.movie_subject_api
const requestUrl = movie.requestUrl
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
    let url = movie_subject_api + subject_id
    console.log(url)
    requestUrl(url,(resData)=>{
      console.log(resData)
      let subject = resData
      addStarArray(subject)
      wx.setNavigationBarTitle({
        title: subject.title,
      })
      _this.setData({
        subject:subject
      },()=>{
        wx.hideLoading()
      })
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
  
  },

  /**
   * 点击剧照预览
   */
  previewPhoto: function (e) {
    console.log(e)
    let currentPhotoUrl = e.currentTarget.dataset.src
    let allPhotoUrl = []
    let photos = this.data.subject.photos
    for (let photo of photos) {
      allPhotoUrl.push(photo.image)
    }
    wx.previewImage({
      current: currentPhotoUrl,
      urls: allPhotoUrl
    })
  },

  /**
   * 进入进入更多剧照页面
   */
  toMorePhotos: function (e) {
    // console.log(e)
    let subject_id = e.currentTarget.dataset.subject_id
    wx.navigateTo({
      url: '/pages/movie/movie_morePhoto/movie_morePhoto?subject_id=' + subject_id,
    })
  },

  /**
   * 进入演员照片页面
   */
  toCastPhotos: function (e) {
    // console.log(e)
    let cast_id = e.currentTarget.dataset.cast_id
    wx.navigateTo({
      url: '/pages/movie/movie_castPhoto/movie_castPhoto?cast_id=' + cast_id,
    })
  }
})