const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ticketSchema = new Schema(
    {
        name:String,
        email:String,
        phone:String,
        date:String,
        title:String,
        content:String,
        status:String,
        comment:String,
        id:String
    }
)

ticketSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret){
        ret.id = ret._id
    }

})


module.exports = mongoose.model('tickets', ticketSchema);