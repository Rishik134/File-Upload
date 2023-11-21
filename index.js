const bodyParser =require("body-parser");
const express=require("express");
const dotenv = require('dotenv');
const ejs = require("ejs");
dotenv.config();
const mongoose = require('mongoose');
const gets=require("./controller/views");
const posts=require("./controller/post")
const middleware=require("./controller/middleware");
const vari=require("./controller/config")


const { JWT_SECRET, MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const app=express();

let Token1=null;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static("static"));
app.use('/uploads', express.static('uploads'));
app.use(express.static(__dirname+"/upload"))

//console.log(gets.adminupload)
app.get("/admin",gets.admin);
app.get("/user",gets.user);
app.get("/adminupload", async (req, res) => {
    try {
        
        const token1 = await vari.Token11();

        middleware.authenticateAdmin(token1)(req, res, () => {
            gets.adminupload(req, res);
        });
    } catch (error) {
        console.error('Error in /adminupload route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/products", async (req, res) => {
    try {
        const token = await vari.Token22();
        middleware.authenticateUser(token)(req, res, () => {
            posts.products(req, res);
        });
    } catch (error) {
        console.error('Error in /products route:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/admin/signup",posts.adminsignup);
app.post("/admin/login",posts.adminlogin);
app.post("/user/signup",posts.usersignup);
app.post("/user/login",posts.userlogin);
app.post("/upload",middleware.upload.single("productImage"),posts.adminupload);
//app.post("/products",posts.products);

app.listen(3000,()=>{
    console.log("Server running at http://localhost:3000")
})