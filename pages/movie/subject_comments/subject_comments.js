// pages/movie/subject_comments/subject_comments.js
const movie = require('../common.js')
const movie_subject_api = movie.movie_subject_api
const requestUrl = movie.requestUrl
const addStarArray = movie.addStarArray

let url = ''
let pullDownRefreshStart = 4
let comments_reviews_category = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments_reviews:[]
  },
  /**
   * 截取content的一部分字符串
   */
  substr: function (comments_reviews){
    for (let comment_review of comments_reviews) {
      comment_review.content = comment_review.content.substr(0,80)
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let subject_id = options.subject_id
    comments_reviews_category = options.comments_reviews_category

    url = movie_subject_api + subject_id + '/' + comments_reviews_category+'?count=4'
    // console.log(url)
    requestUrl(url,(resData)=>{
      let comments_reviews = resData[comments_reviews_category]
      _this.setData({
        comments_reviews: comments_reviews
      },()=>{
        wx.hideLoading()
      })      
    })
  },

  /**
   * 页面下拉刷新
   */
  onPullDownRefresh: function () {
    let _this = this
    let queryUrl = url + '&start=' + pullDownRefreshStart
    // console.log(queryUrl)
    requestUrl(queryUrl, (resData) => {
      // console.log(resData)
      let comments_reviews = resData[comments_reviews_category]
      if (comments_reviews.length !== 0) {
        _this.setData({
          comments_reviews: [...comments_reviews, ..._this.data.comments_reviews]
        }, () => {
          pullDownRefreshStart += 4
          wx.hideLoading()
          wx.stopPullDownRefresh()
        })
      } else {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        wx.showToast({
          title: 'All loaded',
        })
      }
    })
  }
})