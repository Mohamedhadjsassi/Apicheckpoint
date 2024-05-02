const mongoose =require('mongoose')

const userSchema = new mongoose.Schema({
    name : {type : string}
})
module.exports=mongoose.model("User" , userSchema)