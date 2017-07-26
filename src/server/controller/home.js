const Post = require('../service/post.js')
const Converter = require('showdown').Converter
const user = require('../service/user.js')

module.exports.index = (req,res)=>{
	res.locals.user = {}
	let theme = user.getTheme()
	res.locals.statistics = user.getStatistics()

	let converter = new Converter()
	Promise.all([Post.all(),Post.pick(4)]).then(([list,latests])=>{
		res.locals.articles = list.map(item=>{
			item.body = converter.makeHtml((item.body || '').substr(0,200) + '...')
			return item
		})
		res.locals.latests = latests.map(item=>{
			return {
				title:item.title,
				id:item._id
			}
		})
		res.render(`theme/${theme || 'default'}/index`)
	})

}
