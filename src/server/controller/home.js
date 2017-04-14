const userInfo = require('../../test/datas/user.json')
const Post = require('../service/post.js')

module.exports.index = (req,res)=>{
	res.locals.user = userInfo
	Post.all().then(list=>{
		res.locals.articles = list
		res.render(`theme/${userInfo.theme || 'default'}/index`)
	})
}
