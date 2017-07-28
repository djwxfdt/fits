const Post = require('../service/post.js')
const Category = require('../service/category.js')

const Converter = require('showdown').Converter
const user = require('../service/user.js')

module.exports.index = (req,res)=>{
	res.locals.user = {}
	let theme = user.getTheme()
	res.locals.statistics = user.getStatistics()
	let converter = new Converter()

	let cps = Category.all().then(list=>Promise.all(
		list.map(item=>new Promise(r=>Post.countByCategory(item._id).then(c=>{
			r({title:item.title,_id:item._id,count:c})
		})))
	))

	Promise.all([Post.all(),Post.pick(4),cps]).then(([list,latests,categories])=>{
		res.locals.articles = list.filter(item=>item.id).map(item=>{
			item.body = converter.makeHtml((item.body || '').substr(0,200) + '...')
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
