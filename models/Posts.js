const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        postId:Number,
        userId:{type: Schema.Types.ObjectId, ref: 'users'},
        content:String,
        title:String,
        date:String,
        imageName:String,
        id:String
    }
)

postSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        ret.id = ret._id
    }
})


module.exports = mongoose.model('posts', postSchema);