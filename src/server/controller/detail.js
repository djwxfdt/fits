const Post = require('../service/post.js')
const userInfo = require('../../test/datas/user.json')

module.exports.index = (req,res,next) => {
    Post.get(req.params.id).then(doc=>{
        if(doc){
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
