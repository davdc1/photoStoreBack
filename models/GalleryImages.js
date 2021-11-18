
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const galleryImageSchema = new Schema(
    {
        imageName:String,
        id:String
    }
)

galleryImageSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        ret.id = ret._id
    }

})


module.exports = mongoose.model('galleryImages', galleryImageSchema);