const db=require("./dbschema");
//const mongoose=require("mongoose");
async function insertUser(username, password,token) {
    try {
      const newUser = new db.user({
        username: username,
        password: password,
        usToken:token
        // other fields as needed
      });
  
      await newUser.save();
      console.log('User inserted successfully');
    } catch (error) {
      console.error('Error inserting user:', error);
    }
  }
  async function insertAdmin(username, password,token) {
    try {
      const newUser = new db.admin({
        username: username,
        password: password,
        adToken: token
        // other fields as needed
      });
  
      await newUser.save();
      console.log('User inserted successfully');
    } catch (error) {
      console.error('Error inserting user:', error);
    }
  }
  


  async function findUser(username,password) {
    try {
      // Find a user with the specified username
      const user = await db.user.findOne({ username,password });
  
      if (user) {
        const foundUsername = user.username;
        const foundPassword = user.password;
        const token=user.usToken;
  
        console.log('Username found:', foundUsername);
        console.log('Password found:', foundPassword);

        return ({"username":username,"password":password,"usToken":token})
        // You can now use foundUsername and foundPassword as needed
      } else {
        console.log('User not found');
        return(null)
      }
    } catch (error) {
      console.error('Error finding user:', error);
    }
  }
  async function findProduct(){
    try{
      const products=await db.product.find({})
      return products;
    }
    catch(error){
      console.error("Error Finding details",error)
    }
  }
  async function findAdmin(username,password) {
    try {
      // Find a user with the specified username
      const user = await db.admin.findOne({ username,password });
      console.log(user);
      if (user) {
     const foundUsername = user.username;
     const foundPassword = user.password;
     const token=user.adToken;
  
        console.log('Username found:', foundUsername);
        console.log('Password found:', foundPassword);
        return ({"username":username,"password":password,"adToken":token})
        // You can now use foundUsername and foundPassword as needed
      } else {
        console.log('User not found');
        return null;
      }
    } catch (error) {
      console.error('Error finding user:', error);
    }
  }
  async function insertProduct(username,filename, price) {
    try {
      const newUser = new db.product({
        productname: username,
        productpic: filename,
        productprice:price
        // other fields as needed
      });
  
      await newUser.save();
      console.log('User inserted successfully');
    } catch (error) {
      console.error('Error inserting user:', error);
    }
  }
  

module.exports={
    insertUser,
    insertAdmin,
    insertProduct,
    findAdmin,
    findUser,
    findProduct
}