// pages/article-content/article-content.js
const data = require('../data.js')
let app = getApp()
let backgroundAudioManager = app.globalData.backgroundAudioManager

Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentArticle: {},
    // 当前页面也要保存一份是否收藏的结果，以渲染当前页面的收藏图片
    isCurrentCollected: false,
    isMusicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this

    // 获取传递到当前页面的查询参数，并取到对应的文章项
    var articleID = options.articleID;
    this.setData({
      currentArticle: data.data[articleID]
    }, () => {
      if (backgroundAudioManager.paused === false && backgroundAudioManager.src === this.data.currentArticle.music.url) {
        this.setData({
          isMusicPlay: true
        })
      }
    })
    console.log(this.data.currentArticle.music.url)
    // 页面加载了，或初始化storage，或获取storage渲染初始状态
    var key = 'collection_article_' + this.data.currentArticle.postId
    wx.getStorage({
      key: 'collectRecord',
      success: function (res) {
        var collectRecord = res.data
        // 2、如果当前页面被设置过收藏，则渲染收藏结果
        if (collectRecord[key] !== undefined) {
          // console.log(collectRecord[key])
          _this.setData({
            isCurrentCollected: collectRecord[key]
          })
        }
      },
      // 1、失败了意味没有此本地记录，就初始化
      fail: function () {
        wx.setStorage({
          key: 'collectRecord',
          data: {}
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
    console.log('hide')
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
   * 播放音乐的
   */
  playMusic: function () {
    // 音乐播放逻辑非常强烈
    // 点击按钮初次播放，直接设置src既可播放
    if (backgroundAudioManager.src !== this.data.currentArticle.music.url) {
      backgroundAudioManager.title = this.data.currentArticle.music.title
      backgroundAudioManager.coverImgUrl = this.data.currentArticle.music.coverImg
      backgroundAudioManager.src = this.data.currentArticle.music.url
    } else {
      // 当前页面暂停与播放的切换
      if (backgroundAudioManager.paused) {
        backgroundAudioManager.play()
      } else {
        backgroundAudioManager.pause()
      }
    }
    // 暂停与播放状态的改变，设置视图层渲染的数据（为了避免点击因为网络延迟未播放，却及时的切换按钮状态）
    backgroundAudioManager.onPlay(() => {
      this.setData({
        isMusicPlay: true
      })
    })
    backgroundAudioManager.onPause(() => {
      this.setData({
        isMusicPlay: false
      })
    })
    backgroundAudioManager.onEnded(()=>{
      this.setData({
        isMusicPlay:false
      })
    })
  },

  /**
   * 点击收藏，切换收藏与取消，并修改storage中对应那条数据
   */
  collect: function () {
    var key = 'collection_article_' + this.data.currentArticle.postId
    this.setData({
      isCurrentCollected: !this.data.isCurrentCollected
    })
    var _this = this
    wx.getStorage({
      key: 'collectRecord',
      success: function (res) {
        var collectRecord = res.data
        collectRecord[key] = _this.data.isCurrentCollected
        wx.setStorage({
          key: 'collectRecord',
          data: collectRecord
        })
      }
    })
  }
})