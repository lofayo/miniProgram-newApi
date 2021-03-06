// pages/movie/movie_morePhoto/movie_morePhoto.js
const movie = require('../common.js')
const movie_subject_api = movie.movie_subject_api
const requestUrl = movie.requestUrl
let url = ''
let pullDownRefreshStart = 4



Page({

  /**
   * 页面的初始数据
   */
  data: {
    photos:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let subject_id = options.subject_id
    url = movie_subject_api + subject_id + '/photos?count=100'
    let _this = this

    // let url = 'https://douban.uieee.com/v2/movie/celebrity/1275756/photos'
    // url = 'https://douban.uieee.com/v2/movie/subject/25900947/photos?count=4'
    requestUrl(url, (resData) => {
      let photos = resData.photos
      wx.setNavigationBarTitle({
        title: photos[0].album_title
      })
      _this.setData({
        photos: photos
      }, () => {
        wx.hideLoading()
      })
    })
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
    // 因为电影剧照的接口count与start设置，和以前不一样，所以目前不处理
    // let _this = this
    // let queryUrl = url + '&start=' + pullDownRefreshStart
    // console.log(queryUrl)
    // requestUrl(queryUrl, (resData) => {
    //   if (resData.photos.length !== 0) {
    //     _this.setData({
    //       photos: [..._this.data.photos, ...resData.photos]
    //     }, () => {
    //       pullDownRefreshStart += 4
    //       wx.hideLoading()
    //       wx.stopPullDownRefresh()
    //     })
    //   } else {
    //     wx.hideLoading()
    //     wx.stopPullDownRefresh()
    //     wx.showToast({
    //       title: '数据已全部更新了',
    //     })
    //   }
    // })
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
    let photos = this.data.photos
    for (let photo of photos) {
      allPhotoUrl.push(photo.image)
    }
    wx.previewImage({
      current: currentPhotoUrl,
      urls: allPhotoUrl
    })
  }
})