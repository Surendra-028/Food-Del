const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    CartItems : {
        type : Object,
        default : {}
    }
}, {minimize : false})

const UserModel = mongoose.model("user", UserSchema)

module.exports = {
    UserModel
}