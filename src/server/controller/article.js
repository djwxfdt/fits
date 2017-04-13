const showdown = require('showdown')
const userInfo = require('../../test/datas/user.json')

let id = 1
let article = ''

module.exports.postdraft = (req,res)=>{
    article = req.body.article
    res.send({
        id:id,
        code:1
    })
}


module.exports.preview = (req,res)=>{
    let converter = new showdown.Converter()
    res.locals.user = userInfo
    res.render(`theme/${userInfo.theme || 'default'}/preview`,{article:converter.makeHtml(article)})
}
