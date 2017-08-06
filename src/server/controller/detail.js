const Post = require('../service/post.js')
const Converter = require('showdown').Converter
const user = require('../service/user.js')
const Category = require('../service/category.js')

let converter = new Converter()


module.exports.index = (req,res,next) => {

    let cps = Category.allWithCount()

    Promise.all([Post.get(req.params.id),Post.pick(4),cps]).then(([doc,latests,categories])=>{
        if(doc){
            doc.visits = (doc.visits || 0) + 1
            doc.save()
            res.locals.article = {
                body:converter.makeHtml(doc.body),
                title:doc.title,
                id:doc._id,
                poster:doc.poster
            }
            res.locals.latests = latests.filter(item=>item.id).map(item=>{
                return {
                    title:item.title,
                    id:item._id
                }
            })
            res.locals.categories = categories
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
