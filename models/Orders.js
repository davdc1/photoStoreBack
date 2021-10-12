
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const orderSchema = new Schema(
    {
        userId:{type: Schema.Types.ObjectId, ref:"users"},
        status:String,
        paied:Boolean,
        date:String,
        shippingAddress:{
            firsrName:String,
            lastName:String,
            country:String,
            city:String,
            state:String,
            postCode:String,
            street:String,
            buildingNum:String,
            email:String,
            phone:String,
            message:String
        },
        billingAddress:{
            firstName:String,
            lastName:String,
            country:String,
            city:String,
            postCode:String,
            street:String,
            buildingNum:String,
            email:String,
            phone:String
        },
        subTotal:Number,
        shippingPrice:Number,
        tax:Number,
        total:Number,
        cart:[{_id:{type: Schema.Types.ObjectId, ref: 'products'}, quantity:Number, pricePerUnit:Number, idSize:String, size:String}],
        id:String
    }
)

orderSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        ret.id = ret._id
        // delete ret._id
        //ret.id = ret.userId
    }

})


module.exports = mongoose.model('orders', orderSchema);