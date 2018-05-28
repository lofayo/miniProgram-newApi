// pages/article-content/article-content.js
const data = require('../data.js')
let app = getApp()
let backgroundAudioManager = app.globalData.backgroundAudioManager

const utils = require('../../../utils/util.js')
const storage = utils.storage

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
    //1、页面加载，初始本地数据存储（虽然可以放在点击收藏按钮再执行，但两个异步处理放在一起处理就出问题了）
    storage.initStorage('collectRecord', {})


    // 获取传递到当前页面的查询参数，并取到对应的文章项
    var articleID = options.articleID;
    // console.log(articleID)
    this.setData({
      currentArticle: data.data[articleID]
    }, () => {
      if (backgroundAudioManager.paused === false && backgroundAudioManager.src === this.data.currentArticle.music.url) {
        this.setData({
          isMusicPlay: true
        })
      }
    })


    //2、用收藏的结果渲染页面
    storage.getStorage('collectRecord', (resData) => {
      // console.log(resData)
      let key = 'collection_article_' + _this.data.currentArticle.postId
      // 新进入一个文章页，根本没设置过该页面的收藏
      if (resData[key] !== undefined) {
        _this.setData({
          isCurrentCollected: resData[key]
        })
      }
    })
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
    let _this = this
    //1、 这是表象看到收藏与取消
    this.setData({
      isCurrentCollected: !this.data.isCurrentCollected
    })

    // 2、这是背后记录收藏结果
    var key = 'collection_article_' + this.data.currentArticle.postId
    let collectValue = {}
    collectValue[key] = this.data.isCurrentCollected
    storage.setStorage('collectRecord',collectValue)
  }
})