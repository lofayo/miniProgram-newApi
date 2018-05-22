// test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath: [],
    info: [
      {
        name: 'lofyao',
        sex: 'female'
      },
      {
        name: 'lofy',
        sex: 'male'
      }
    ],
    name: ['lofayo', 'lofy'],
    sex: ['female', 'male']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // // 允许从相机和相册扫码
    // wx.scanCode({
    //   success: (res) => {
    //     console.log(res)
    //   }
    // })
    // wx.makePhoneCall({
    //   phoneNumber: '1340000' //仅为示例，并非真实的电话号码
    // })
    // const backgroundAudioManager = wx.getBackgroundAudioManager()

    // backgroundAudioManager.title = '此时此刻'
    // backgroundAudioManager.epname = '此时此刻'
    // backgroundAudioManager.singer = '许巍'
    // backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    // backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放

    wx.request({
      url: 'https://douban.uieee.com/v2/movie/in_theaters',
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
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
   * 选择图片
   */
  chooseImage: function () {
    let _this = this
    wx.chooseImage({
      count: 2, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        _this.setData({
          imagePath: tempFilePaths
        })
        // wx.previewImage({
        //   current: '', // 当前显示图片的http链接
        //   urls: tempFilePaths // 需要预览的图片http链接列表
        // })
      }
    })
  }
})