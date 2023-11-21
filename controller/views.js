//const express=require("express");
const path = require('path');
const admin=(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/admin.html"));
}
const user=(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/user.html"));
}
function adminupload(req,res){
    res.sendFile(path.join(__dirname, '../views/adminentry.html'));
}

/*const products=(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/products.html"));
}*/


module.exports={
    admin,
    user,
    adminupload,

}