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


module.exports = {
    api: api,
    movie_subject_api: movie_subject_api,
    movie_search_api: movie_search_api,
    addStarArray: addStarArray
}