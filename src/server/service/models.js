const db = require('./db.js')
const {blogSchema,categorySchema,commentSchema,bannerSchema} = require('../model/mongo/shemas.js')


let BlogModel = null
let CategoryModel = null
let CommentModel = null
let BannerModel = null


let conn = db.createConnection()

if(db.getType() == 'mongodb'){
    BlogModel = conn.model('post',blogSchema)
    CategoryModel = conn.model('category',categorySchema)
    CommentModel = conn.model('comment',commentSchema)
    BannerModel = conn.model('banner',bannerSchema)
}


module.exports = {
    BlogModel,
    CategoryModel,
    CommentModel,
    BannerModel
}
