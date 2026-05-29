const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    UserId : {
        type : String,
        required : true 
    },
    items : {
        type : Array,
        required : true
    },
    payment : {
        type : Boolean,
        default : false
    },
    amount : {
        type : Number,
        required : true
    },
    Address : {
        type : Object,
        required : true,
    },
    status : {
        type : String,
        default : "Food Processing"
    },
    date : {
        type : Date,
        default : Date.now(),
    }
})

const OrderModel = mongoose.models.order || mongoose.model("order", OrderSchema) 


module.exports = {
    OrderModel
}