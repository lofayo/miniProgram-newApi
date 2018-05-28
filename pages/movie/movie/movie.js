const movie = require('../common.js')
const api = movie.api
const requestUrl = movie.requestUrl
const addStarArray = movie.addStarArray

Page({

  /**
   * 页面的初始数据
   */
  data: {
    moviesCategory: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this

    let tempArray = []
    for (let i = 0; i < 3; i++) {
      let url = api[i].url + '?start=0&count=3'
      requestUrl(url,(resData)=>{ 
        // console.log(resData)
        let subjects = resData.subjects
        addStarArray(subjects)
        let tempJson = {}
        tempJson['name'] = api[i].category
        tempJson['url_id'] = i
        tempJson['subjects'] = subjects
        tempArray.push(tempJson)
        _this.setData({
          moviesCategory:tempArray
        },()=>{
          wx.hideLoading()
        })
      })
    }
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