const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    username:String,
    password:String,
    usToken:String
})
const user=mongoose.model("user",userSchema);
const adminSchema=mongoose.Schema({
    username:String,
    password:String,
    adToken:String
})
const admin=mongoose.model("admin",adminSchema);
const productSchema=mongoose.Schema({
    productname:String,
    productpic:String,
    productprice:Number,
})
const product=mongoose.model("detail",productSchema);


module.exports={
    user,
    admin,
    product
}