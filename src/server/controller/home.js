const userInfo = require('../../test/datas/user.json')
const Post = require('../service/post.js')
const showdown = require('showdown')

module.exports.index = (req,res)=>{
	res.locals.user = userInfo
	let converter = new showdown.Converter()
	Post.all().then(list=>{
		res.locals.articles = list.map(item=>{
			 item.body = converter.makeHtml(item.body)
			 return item
		})
		res.render(`theme/${userInfo.theme || 'default'}/index`)
	})
}
