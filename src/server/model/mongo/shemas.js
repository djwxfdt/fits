var mongoose = require('mongoose')
var Schema = mongoose.Schema

export const BlogPost = new Schema({
    author    : String,
    title     : String,
    body      : String,
    date      : Date,
    comments : [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
})

export const Comment = new Schema({
    author : String,
    body:String
})
