2018.05.12
学习小程序时的问题点：

	1、理解移动端物理像素、逻辑像素、设备像素比、rpx?
	2、不加<text>wenben</text>的文本在真机不能长按选中
	3、js里的深拷贝与浅拷贝？
	4、很多东西都是相通的，比如：看书

		接口：http://www.book.com?bookId=1&chapterId=1_1&cotentId=1_1_1
		
			接口用法：每次请求接口，就解析查询字符串，获取：
															bookId = 1
															chapterId = 1_1
															contentId = 1_1_1
					程序再根据这些请求参数去数据库查询对应数据返回，只是
					
					
		书籍列表——>
					进入一本书的章节列表——>
											点击一个章节进入内容页面
		
		-----------------------------------------------------------------------------
		（1）第一次打开，从一个接口获取所有书籍数据，从而展示为书籍列表。
		
		（2）这里显示的每本书都有一个url属性，这个url也就是获取书籍章节的接口
		
		（3）点击一本书，跳转到另一个模板页面，并且请求该书的章节接口数据，从而显示章节列表
		
		（4）章节列表的每个章节
		-----------------------------------------------------------------------------
		
		上述解释只是自己所想的一种可能，其实程序远没有表象看到的复杂
		
		有关书籍的一切
	
	5、小程序数据获取流程，从文章列表页到文章详情页
		
		（1）渲染文章列表时，将每条数据的ID渲染进列表item中
			<block wx:for="{{array}}">
				<view data-id="{{item.id}}" bindtap="itemTap">
					<template data="{{...item}}"></template>
				</view>
			</block>
		（2）点击事件的事件对象可以获取到事件发生所在的元素，亦即可以获取到item的ID属性
			Page({
				itemTap:function(event){
					var id = event.currentTarget.dataset.id
				}
			})
		（3）将ID从文章列表页传递到文章详情页，onLoad事件中可以获取当前打开页面的query参数id
		
		（4）将该参数拿到数据库比对，得到由文章列表项对应的文章详情
		
		（5）将文章详情数据渲染进文章详情模板中
	
	6、文章收藏功能与数据库的交互
	
		正确做法：添加收藏与取消收藏，都会发起一次http请求，调用接口，将收藏状态存于数据库，
				  每次打开带有收藏功能的页面，都会拿到收藏状态值，渲染页面
		
		模拟做法：将添加收藏与取消收藏的状态存于本地数据库，如：localStorage，
				  同样也是每次打开页面，取出该值渲染页面，弊端是如果用户彻底删除本地数据库，这种状态就不是正常渲染了
	
	7、两种状态图片的切换，真的有多种实现方式
		第一层判断：必须是鼠标悬浮
								（1）:hover
									第二层考虑：实现方法
										前期是HTML结构里先放好两个<img />，鼠标悬浮改变样式，显示想要的一张图片	
								（2）mouseover/mouseout
									第二层考虑：实现方法
										- display:none/block;（也是HTML结构里两个<img />来回切换）
										- 一个<img src="" data-src="" />（来回切换src与data-src的值）
	
	8、小程序里多次用到点击切换图片的状态效果，能否实现一个统一的方法？
	
	9、单元测试？事件驱动？
	
	10、对于一个问题想到了解决办法，不要盲目地去实现，先要想清楚这个方法的实现原理以及实现原理的属性，从而就会想到它的实现是否会带来其它问题
	
	11、小程序的绑定主要是在js里实现，页面结构对数据的引用，与js对数据的引用，两种方式还是不同的
		wxml:{{articleLists[0]}}	.js: {{this.data.articleLists}}

	12、js里undefined与'undefined'的区别？
			一个没定义的变量： typeof lofayo === 'undefined'
			json没定义的属性： json.lofayo === undefined
												typeof json.lofayo === 'undefined'
												
	13、在小程序从一个页面返回了，就触发了页面生命周期里的unload事件，也就是页面卸载了
			（这种思想完全不同于jquery，比如每个页面都有一个音乐可以播放，却共用一个公共播放器，播放页面返回依然可以播放，因为播放器是全局的，而那个播放页面其实已卸载了）
		
		还有个问题：全局播放器播放时，进入子页面依然在播放，可以去到看到播放状态，却不能正确的去到播放状态的值
			如：在播放状态看这两个值
				console.log(app.globalData.innerAudioContext)
				console.log(app.globalData.innerAudioContext.paused)
	
	14、设置本地数据库存储要注意的问题：每个函数都只实现一个小功能，再将函数拼起来，才构成整个应用
		1、初次进入页面：
						没设置过收藏，就初始化本地数据库存储对象（对应生命周期函数里）
						设置过收藏，就从本地数据库拿值渲染
		2、在页面里切换收藏，就把值存到本地数据库
		
	
	15、
		引入模板.wxml文件：<import src="/templates/template.wxml" />
		引入模板.wxss文件：@import "/templates/template.wxss";
		引入公共js函数或方法：
							//common.js
							module.exports = {
							  API:API,
							  requestAPI: requestAPI
							}
							
							//index.js
							const common = require('../common.js')			
							
		
				
	16、函数嵌套返回与对象方法的返回
		
			（1）函数嵌套返回
				function fn1(){
					function fn2(){
						return 2;
					}
					return fn2();
				}
				fn1();	//2
			（2）wx.request返回一个requestTask，可以中断请求，所以不可能返回success函数的函数的返回值
				function requestAPI(url) {
				  return wx.request({
					url: url,
					success:function(res){
					  return res.data
					}
				  })
				}
	17、写过的还不太可行的代码
	    // function fn(dataKey) {
    //   return function(json){
    //     let temp = []
    //     temp.push(json)
    //     _this.setData({
    //       '${dataKey}': temp
    //     }, () => {
    //       console.log(_this.data.dataKey)
    //     })  
    //   }
    // }


    // function handleData(json,dataKey){
    //   tempArr.push(json)
    //   _this.setData({
    //     moviesCategory: tempArr
    //   })
    // }
    // 测试封装wx.request的函数
    // let res = requestAPI('http://t.yushu.im/v2/movie/in_theaters', handleData)
    // return;
	
	    for (let i = 0; i < commonAPI.length; i++) {
      // let url = commonAPI[i].url + '?start=0&count=3';
      // requestAPI(url, handleData)
	  }
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  
	  