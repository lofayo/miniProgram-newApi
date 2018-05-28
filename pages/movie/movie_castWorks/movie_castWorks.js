// pages/movie/movie_castWork/movie_castWorks.js
const movie = require('../common.js')
const movie_celebrity_api = movie.movie_celebrity_api
const requestUrl = movie.requestUrl
const addStarArray = movie.addStarArray

let url = ''
let pullDownRefreshStart = 18
Page({

  /**
   * 页面的初始数据
   */
  data: {
    works:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let cast_id = options.cast_id
    url = movie_celebrity_api + cast_id + '/works?count=18'
    requestUrl(url,(resData)=>{
      // console.log(resData)
      let works = resData.works
      wx.setNavigationBarTitle({
        title: resData.celebrity.name
      })
      for (let work of works) {
        addStarArray(work.subject)
      }
      _this.setData({
        works:works
      },()=>{
        wx.hideLoading()
      })
    })
  },
  /**
   * 页面上拉触底事件的处理函数（上拉加载）
   */
  onReachBottom: function () {
    let _this = this
    let queryUrl = url + '&start=' + pullDownRefreshStart
    // console.log(queryUrl)
    requestUrl(queryUrl, (resData) => {
      // console.log(resData)
      let works = resData.works
      
      if (works.length !== 0) {
        for (let work of works) {
          addStarArray(work.subject)
        }
        _this.setData({
          works: [..._this.data.works, ...works]
        }, () => {
          pullDownRefreshStart += 18
          wx.hideLoading()
        })
      } else {
        wx.hideLoading()
        wx.showToast({
          title: 'All loaded',
        })
      }
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
  }
})