const path = require('path');
const funs=require("./dbfuns")
const admin=(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/admin.html"));
}
const user=(req,res)=>{
    res.sendFile(path.join(__dirname,"../views/user.html"));
}
function adminupload(req,res){
    res.sendFile(path.join(__dirname, '../views/adminentry.html'));
}

const products=async(req,res)=>{
    const products=await funs.findProduct();
    console.log(products);
    res.render("products",{products})
    
}

module.exports={
    admin,
    user,
    adminupload,
    products
}