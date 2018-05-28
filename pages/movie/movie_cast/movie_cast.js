// pages/movie/movie_cast/movie_cast.js
const movie = require('../common.js')
const movie_celebrity_api = movie.movie_celebrity_api
const requestUrl = movie.requestUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cast:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let cast_id = options.cast_id
    let url = movie_celebrity_api+cast_id
    requestUrl(url,(resData)=>{
      // console.log(resData)
      _this.setData({
        cast:resData
      },()=>{
        wx.hideLoading()
      })
    })
  },

  /**
   * 跳转到作品
   */
  toMovieSubject:function(e){
    // console.log(e)
    let subject_id = e.currentTarget.dataset.subject_id
    wx.navigateTo({
      url: '/pages/movie/movie-subject/movie-subject?subject_id=' + subject_id,
    })
  },

  /**
   * 跳转到更多影人作品
   */
  toCastWorks: function (e) {
    // console.log(e)
    let cast_id = e.currentTarget.dataset.cast_id
    wx.navigateTo({
      url: '/pages/movie/movie_castWorks/movie_castWorks?cast_id=' + cast_id,
    })
  },
  /**
   * 跳转到更多影人剧照
   */
  toCastPhotos: function (e) {
    // console.log(e)
    let cast_id = e.currentTarget.dataset.cast_id
    wx.navigateTo({
      url: '/pages/movie/movie_castPhoto/movie_castPhoto?cast_id=' + cast_id,
    })
  },

  /**
   * 点击剧照预览
   */
  previewPhoto: function (e) {
    // console.log(e)
    let currentPhotoUrl = e.currentTarget.dataset.src
    let allPhotoUrl = []
    let photos = this.data.cast.photos
    for (let photo of photos) {
      allPhotoUrl.push(photo.image)
    }
    wx.previewImage({
      current: currentPhotoUrl,
      urls: allPhotoUrl
    })
  }

})