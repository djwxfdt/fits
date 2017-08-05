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
    let {id,title,article,category,poster} = req.body
    if(id){
        Post.update({id,title,article,category,poster})
        res.send({
            code:CODE.OK
        })
    }
    else{
        Post.save({
            title:title,
            body:article,
            poster,
            category:category
        }).then(data=>{
            res.send({
                code:CODE.OK,
                id:data._id
            })
        })
    }

}



module.exports.preview = (req,res)=>{
    let converter = new showdown.Converter()
    res.locals.user = userInfo
    res.render(`theme/${userInfo.theme || 'default'}/preview`,{article:converter.makeHtml(article)})
}

module.exports.index = (req,res)=>{
    Post.get(req.params.id).then(doc=>{
        if(doc){
            res.send({code:CODE.OK,article:doc})
        }
        else{
            res.send({code:-1})
        }

    }).catch(err=>{
        res.send({code:-1,err:err})
    })
}


module.exports.postdelete = (req,res)=>{
    let {ids} = req.body
    if(!ids || ids.length == 0){
        res.send({code:CODE.OK})
    }
    Post.delete(ids).then(()=>{
        res.send({code:CODE.OK})

    })
}
