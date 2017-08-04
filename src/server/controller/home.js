const Post = require('../service/post.js')
const Category = require('../service/category.js')

const Converter = require('showdown').Converter
const user = require('../service/user.js')

module.exports.index = (req,res)=>{
	res.locals.user = {}
	let theme = user.getTheme()
	res.locals.statistics = user.getStatistics()
	let converter = new Converter()

	let cps = Category.allWithCount()

	let limit = theme =='jianshu'?80:200

	Promise.all([Post.all(),Post.pick(4),cps]).then(([list,latests,categories])=>{
		res.locals.articles = list.filter(item=>item.id).map(item=>{
			item.body = converter.makeHtml((item.body || '').substr(0,limit) + '...')
			return item
		})
		res.locals.latests = latests.filter(item=>item.id).map(item=>{
			return {
				title:item.title,
				id:item._id
			}
		})
		res.locals.categories = categories
		res.locals.setting = user.getSetting()
		res.render(`theme/${theme || 'default'}/index`)
	})

}
