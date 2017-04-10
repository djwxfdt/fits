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
    console.error(req.params)
    let converter = new showdown.Converter()
    res.render(`theme/${userInfo.theme || 'default'}/preview`,{article:converter.makeHtml(article)})
}
