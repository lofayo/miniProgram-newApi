// pages/movie/movie_morePhoto/movie_morePhoto.js
const movie = require('../common.js')
const movie_subject_api = movie.movie_subject_api
let url = ''
let start = 0



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
    wx.request({
      url: url,
      header:{
        "content-type":"json"
      },
      success:function(res){
        console.log(res)
        _this.setData({
          photos:res.data.photos
        },()=>{
          start += 20
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    let _this = this
    let queryUrl = url + '?start=' + start
    console.log(queryUrl)
    wx.request({
      url: queryUrl,
      header: {
        "content-type": "json"
      },
      success: function (res) {
        console.log(res)
        if (res.data.photos.length !== 0) {
          _this.setData({
            photos: [...res.data.photos, ..._this.data.photos]
          }, () => {
            start += 10
            wx.stopPullDownRefresh()
          })
        } else {
          wx.showToast({
            title: '数据已全部更新了',
          })
        }
        wx.stopPullDownRefresh()
      }
    })

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