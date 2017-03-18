const userInfo = require('../../test/datas/user.json')
const articles = require('../../test/datas/articles.json')


module.exports.index = (req,res)=>{
	res.locals.user = userInfo
	res.locals.articles = articles
	res.render(`theme/${userInfo.theme || 'default'}`)
}
