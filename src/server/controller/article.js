const showdown = require('showdown')
const userInfo = require('../../test/datas/user.json')
const Post = require('../service/post.js')
const {CODE} = require('../../utils/code.js')

let id = 1
let article = ''

module.exports.postdraft = (req,res)=>{
    res.send({
        id:id,
        code:1
    })
}

module.exports.postsave = (req,res)=>{
    Post.save({
        title:req.body.title,
        body:req.body.article
    })
    res.send({
        code:CODE.OK
    })
}



module.exports.preview = (req,res)=>{
    let converter = new showdown.Converter()
    res.locals.user = userInfo
    res.render(`theme/${userInfo.theme || 'default'}/preview`,{article:converter.makeHtml(article)})
}
