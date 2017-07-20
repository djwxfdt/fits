const Post = require('../service/post.js')
const userInfo = require('../../test/datas/user.json')
const Converter = require('showdown').Converter

let converter = new Converter()


module.exports.index = (req,res,next) => {
    Post.get(req.params.id).then(doc=>{
        if(doc){
            doc.visits = (doc.visits || 0) + 1
            doc.save()

            doc.body = converter.makeHtml(doc.body)
            res.locals.article = doc
            res.locals.user = userInfo
            res.render(`theme/${userInfo.theme || 'default'}/detail`)
        }
        else{
            next()
        }

    }).catch(err=>{
        res.send(err)
    })
}
