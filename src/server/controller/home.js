const Post = require('../service/post.js')
const Converter = require('showdown').Converter
const user = require('../service/user.js')

module.exports.index = (req,res)=>{
	res.locals.user = {}
	let theme = user.getTheme()
	res.locals.statistics = user.getStatistics()

	let converter = new Converter()
	Post.all().then(list=>{
		res.locals.articles = list.map(item=>{
			 item.body = converter.makeHtml(item.body.substr(0,200) + '...')
			 return item
		})
		res.render(`theme/${theme || 'default'}/index`)
	})
}
