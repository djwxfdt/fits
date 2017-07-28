const Post = require('../service/post.js')
const Converter = require('showdown').Converter
const user = require('../service/user.js')

let converter = new Converter()


module.exports.index = (req,res,next) => {
    Post.get(req.params.id).then(doc=>{
        if(doc){
            doc.visits = (doc.visits || 0) + 1
            doc.save()
            res.locals.article = {
                body:converter.makeHtml(doc.body),
                title:doc.title,
                id:doc._id
            }
            res.locals.setting = user.getSetting()
            res.locals.user = {}
            res.render(`theme/${user.getTheme() || 'default'}/detail`)
        }
        else{
            next()
        }

    }).catch(err=>{
        res.send(err)
    })
}
