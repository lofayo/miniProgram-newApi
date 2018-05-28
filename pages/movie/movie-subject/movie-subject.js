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
    // console.log(url)
    requestUrl(url,(resData)=>{
      // console.log(resData)
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
   * 进入演员介绍页面
   */
  toCast: function (e) {
    // console.log(e)
    let cast_id = e.currentTarget.dataset.cast_id
    wx.navigateTo({
      url: '/pages/movie/movie_cast/movie_cast?cast_id=' + cast_id,
    })
  },

  /**
   * 进入更多剧照页面
   */
  toMorePhotos: function (e) {
    // console.log(e)
    let subject_id = e.currentTarget.dataset.subject_id
    wx.navigateTo({
      url: '/pages/movie/movie_morePhoto/movie_morePhoto?subject_id=' + subject_id,
    })
  },

  /**
   * 进入更多评论/影评页面
   */
  toMoreComments: function (e) {
    // console.log(e)
    let subject_id = e.currentTarget.dataset.subject_id
    let comments_reviews_category = e.currentTarget.dataset.comments_reviews_category
    wx.navigateTo({
      url: '/pages/movie/subject_comments/subject_comments?subject_id=' + subject_id + '&comments_reviews_category=' + comments_reviews_category,
    })
  }
})