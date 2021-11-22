const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const sizesSchema = new Schema(
    [
        {
            size:String,
            price:Number,
            idSize:String
        }
    ]
)

const productSchema = new Schema(
    {
        productId:Number,
        prodName:String,
        rank:Number,
        theme:[String],
        imageName:String,
        sizes:Array,
        id:String
    }
)

productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        ret.id = ret._id
        // delete ret._id
    }
})



module.exports = mongoose.model('products', productSchema);
