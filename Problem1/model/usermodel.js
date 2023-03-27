const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:String,
    email: String,
    Password:String
})

const userModel = mongoose.model("weather",userSchema)

module.exports={
    userModel
}
