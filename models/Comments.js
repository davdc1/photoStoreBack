
const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

const commentSchema = new Schema(
    {
        commentId:Number, //auto increment?
        postId: {type: Schema.Types.ObjectId, ref: 'posts', required: true},
        userId:{type: Schema.Types.ObjectId, ref: 'users'},
        //userId: {type: Schema.Types.ObjectId, ref: 'users'},
        title:String,
        content:String,
        date:String,
        id:String
    }
);

commentSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        ret.id = ret._id
        //delete ret._id
    }

})

module.exports = mongoose.model('comments', commentSchema);