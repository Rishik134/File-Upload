const funs=require("../model/dbfuns");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const vari=require("./config");

dotenv.config();

const JWT_SECRET_ADMIN=process.env.JWT_SECRET_ADMIN;
const JWT_SECRET_USER=process.env.JWT_SECRET_USER;

const adminlogin = async (req, res) => {
    var username = req.body.loginUsername;
    var password = req.body.loginPassword;
    var data = await funs.findAdmin(username, password);

    console.log(data);

    if (data) {
        Token1 = data.adToken;
        console.log('Token1 in adminlogin:', Token1);

        await vari.handleToken1(Token1);

        console.log('After handleToken1 call:', Token1);

        // Simple redirect without any conditional logic
        res.redirect("/adminupload");
        //res.s("Successfully logged in!"); // Replace with an appropriate message

    } else {
        res.json({ "message": "Unauthorized" });
    }
};

const userlogin=async(req,res)=>{
    var username=req.body.loginUsername;
    var password=req.body.loginPassword;
    let data=await funs.findUser(username,password);
    console.log(data);
    if (data){
        Token2 = data.usToken;
        console.log('Token2 in adminlogin:', Token2);

        await vari.handleToken2(Token2);

        console.log('After handleToken2 call:', Token2);

        res.redirect("/products");
        //res.send("Successfully logged in!"); 
    }
    else{
        res.json({"message":"Unathorised"});
    }
}

const adminsignup = (req, res) => {
    var username = req.body.signupUsername;
    var password = req.body.signupPassword;

    const token = jwt.sign({ username: username }, JWT_SECRET_ADMIN);
    console.log(token);
    funs.insertAdmin(username, password, token);

    console.log(username, password, token);
    res.status(200).json({ message: 'Admin signed up successfully.' });
};


const usersignup=(req,res)=>{
    var username=req.body.signupUsername;
    var password=req.body.signupPassword;
    const token = jwt.sign({ username: username }, JWT_SECRET_USER);
    console.log(token);
    funs.insertUser(username, password, token);

    console.log(username, password, token);
    res.status(200).json({ message: 'User signed up successfully.' });
}


const adminupload=(req, res) => {
    console.log(req.body);
    const file = req.file;


  const name=file.filename;
  console.log(name);
  console.log(req.body.filename,req.body.productPrice)
  funs.insertProduct(req.body.filename,name,req.body.productPrice);

  // Send a response
  res.json({ message: 'File uploaded successfully!' });

}

module.exports={
    userlogin,
    usersignup,
    adminlogin,
    adminsignup,
    adminupload
}
