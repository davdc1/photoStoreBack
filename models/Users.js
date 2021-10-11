
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const cartSchema = new Schema(
    {
        cart:[{productId:{type: Schema.Types.ObjectId, ref: 'products'}, quantity:Number, pricePerUnit:Number, idSize:String, size:String}] 
    }
)

const userSchema = new Schema(
    {
        userIndex:Number, //auto increment
        name: {
            firstName:String,
            lastName:String,
        },
        email:String,
        phone:String,
        authorization:String,
        cart:[{productId:{type: Schema.Types.ObjectId, ref: 'products'}, quantity:Number, price:Number, idSize:String, size:String}],
        orders:[{type: Schema.Types.ObjectId, ref: 'orders'}],
        id:String
    }
)

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        ret.id = ret._id
        // delete ret._id
        //ret.id = ret.userId
    }

})


module.exports = mongoose.model('users', userSchema);