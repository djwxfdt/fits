const userInfo = require('../../test/datas/user.json')
const articles = require('../../test/datas/articles.json')
const _ = require('lodash')

const getArticleById = id =>_.find(articles,o=>o.id ==id)


module.exports.index = (req,res,next) => {
    res.locals.user = userInfo
    let article = getArticleById(req.params.id)
    if(!article){
        console.error('cannot find article')
        return next()
    }
	res.locals.article = article
	res.render(`theme/${userInfo.theme || 'default'}/detail`)
}
