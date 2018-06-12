// pages/myMovie/movieLists/movieLists.js

const data = require('../myMovieData.js')

const myMovieData = data.myMovieData



Page({

  /**
   * 页面的初始数据
   */
  data: {
    myMovieData:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      myMovieData
    })
  },
  toMovieDetail: function(e) {
    let id = e.currentTarget.dataset.id;
    let name = e.currentTarget.dataset.name;
    let url = "/pages/myMovie/movieDetail/movieDetail?id="+id+'&name='+name
    wx.navigateTo({
      url: url,
    })
  }
  
})