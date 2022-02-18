
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            firstName:String,
            lastName:String,
        },
        email:{
            type: String,
            required:true,
            unique:true
        },
        password:{
            type:String
        },
        authorization:{
            type:String,
            required:true,
            default:"customer"
        },
        phone:String,
        cart:[{
            productId:{type: Schema.Types.ObjectId, ref: 'products'},
            quantity:Number,
            price:Number,
            idSize:String,
            size:String,
            imageName:String
        }],
        orders:[{type: Schema.Types.ObjectId, ref: 'orders'}],
        id:String,
        token:String
    },
    {
        timestamps:true
    }
)

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        ret.id = ret._id
        delete ret.password
    }

})

module.exports = mongoose.model('users', userSchema);