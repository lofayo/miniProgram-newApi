// let DOMAIN = 'http://t.yushu.im/'

const domain = 'https://douban.uieee.com/'

let in_theaters = domain + 'v2/movie/in_theaters'
let coming_soon = domain + 'v2/movie/coming_soon'
let top250 = domain + 'v2/movie/top250'
let weekly = domain + 'v2/movie/weekly'
let us_box = domain + 'v2/movie/us_box'
let new_movies = domain + 'v2/movie/new_movies'

let movie_subject_api = domain + 'v2/movie/subject/'

let movie_search_api = domain + 'v2/movie/search?count=18&q='

let movie_celebrity_api = domain + 'v2/movie/celebrity/'

const api = [{
    category_en: 'in_theaters',
    category: '正在热映',
    url: in_theaters
}, {
    category_en: 'coming_soon',
    category: '即将上映',
    url: coming_soon
}, {
    category_en: 'top250',
    category: 'top250',
    url: top250
}, {
    category_en: 'weekly',
    category: '口碑榜',
    url: weekly
}, {
    category_en: 'us_box',
    category: '北美票房榜',
    url: us_box
}, {
    category_en: 'new_movies',
    category: '新片榜',
    url: new_movies
}]
// wx.request返回一个requestTask，可以中断请求，所以不可能返回success函数的函数的返回值
// function requestAPI(url) {
//   return wx.request({
//     url: url,
//     success:function(res){
//       return res.data
//     }
//   })
// }

/**
 * 根据传入的星级数字，序列为一个数组
 */
const starArray = [
    [0, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1]
]
/**
 * 对每一个请求数据项添加星星数组的属性
 * @method addStarArray
 * @param {array} subjects 请求结果的数组对象
 * @return {undefined} 
 * eg:addStarArray([])
 */
function addStarArray(subjects) {
  if (Array.isArray(subjects)) {
    for (let i = 0; i < subjects.length; i++) {
      let stars = subjects[i].rating.stars
      subjects[i].rating['star'] = starArray[Math.round(stars / 10)]
    }
  } else {
    let stars = subjects.rating.stars
    subjects.rating['star'] = starArray[Math.round(stars / 10)]
  }
}

/**
 * 封装请求接口的方法（因为每次请求的数据不一样，以及对数据的处理也不一样，特传入数据处理函数）
 * url 接口地址 string
 * handleDataCallback 处理请求数据的函数 function
 */
const requestUrl = (url, handleDataCallback) => {
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
        handleDataCallback(res.data)
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
    api: api,
    movie_subject_api: movie_subject_api,
    movie_search_api: movie_search_api,
    movie_celebrity_api: movie_celebrity_api,
    addStarArray: addStarArray,
    requestUrl: requestUrl
}