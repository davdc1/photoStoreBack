
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema(
    {
        postId:Number, //auto increment?
        userId:Number,
        //userId:{type: Schema.Types.ObjectId, ref: 'users'},
        content:String,
        title:String,
        date:String,
        id:String
    }
)

postSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        //console.log('transform ret:', ret);
        //console.log('transform doc:', doc);
        //ret.id = ret.postId
        ret.id = ret._id
        //delete ret._id
    }

})


module.exports = mongoose.model('posts', postSchema);