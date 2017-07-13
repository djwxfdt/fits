var mongoose = require('mongoose')
var Schema = mongoose.Schema

const BlogPost = new Schema({
    title     : String,
    body      : String,
    date      : Date,
    comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

const Comment = new Schema({
    author : String,
    body:String
})

module.exports = {
    BlogPost,
    Comment,
}
