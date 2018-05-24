const movie = require('../pages/movie/common.js')
const addStarArray = movie.addStarArray

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}


// 请求接口方法的封装
/**
 * @1: url 请求接口地址 string
 * @2: storeData 存储到data的数据属性名 string
 * @3: _this 动态设置数据的页面this对象 object
 */
const requestUrl = (url, storeData,_this) => {
  wx.showLoading({
    title: 'loading',
  })
  wx.request({
    // @1
    url: url,
    header: {
      'content-type': 'json' // 默认值
    },
    success: function (res) {
      console.log(res)
      if (res.statusCode === 200) {
        let subject = res.data.subjects || res.data
        addStarArray(subject)
        wx.setNavigationBarTitle({
          title: res.data.title
        })
        let tempJson = {}
        // @2
        tempJson[storeData] = subject
        // @3
        _this.setData(tempJson, () => {
          wx.hideLoading()
        })
      } else {
        wx.hideLoading()
        wx.showToast({
          title: '请求URL错误',
        })
      }
    },
    // 因为网络原因请求失败
    fail: function () {
      wx.hideLoading()
      wx.showToast({
        title: '请检查网络设置',

      })
    }
  })
}
module.exports = {
  formatTime: formatTime,
  requestUrl: requestUrl
}
