var mongoose = require('mongoose')
var Schema = mongoose.Schema

const BlogCategory = new Schema({
    title   :String,
    parent : {type: Schema.Types.ObjectId, ref: 'Category' }
})


const BlogPost = new Schema({
    title     : String,
    body      : String,
    date      : Date,
    deleted   :Boolean,
    visits    :Number,
    comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    category : {type: Schema.Types.ObjectId, ref: 'Category' }

})

const Comment = new Schema({
    author : String,
    body:String
})


module.exports = {
    BlogPost,
    Comment,
    BlogCategory
}
