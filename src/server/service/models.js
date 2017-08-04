const db = require('./db.js')
const {blogSchema,categorySchema,commentSchema} = require('../model/mongo/shemas.js')


let BlogModel = null
let CategoryModel = null
let CommentModel = null


let conn = db.createConnection()

if(db.getType() == 'mongodb'){
    BlogModel = conn.model('post',blogSchema)
    CategoryModel = conn.model('category',categorySchema)
    CommentModel = conn.model('comment',commentSchema)
}


module.exports = {
    BlogModel,
    CategoryModel,
    CommentModel
}
