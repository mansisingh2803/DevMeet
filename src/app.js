const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/users");
const {validateSignUpDate}  = require("./utils/validation")
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("../src/middlewares/auth");
//This will convert the data to JS object worked as a middleware
app.use(express.json());
app.use(cookieParser());

//signup api
app.post("/signup", async (req, res) =>{
    try{
    // Validation of data
    
validateSignUpDate(req);
console.log("Request body:", req.body);

    // Encrypt the password
    const {firstName, lastName, emailId, password} = req.body;
const passwordHash = await bcrypt.hash(password, 10);
console.log(passwordHash);

    //create a new instance of the user model
   const user = new User({firstName, lastName, emailId, password: passwordHash,});


        await user.save();
    res.send("User added successfully");}
    catch(err){
        res.status(400).send("Error saving the use:" + err.message);
    }
})

//login API
app.post("/login", async (req, res) =>{
    try{
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("INVALID Credentials");
        }
        const isPasswordValid = await user.validatePassword(password);
        if(isPasswordValid){
        //Create a JWT Token
        const token = await user.getJWT();

        //Add the token to cookie and send the response back to the user
        res.cookie("token", token, { httpOnly: true });
    
            res.send("Login Successfully!!!");
        
        }
        else{
            throw new Error("INVALID Credentials");
        }
    }
    catch(err){
        res.status(400).send("Error saving the use:" + err.message);
    }
});

app.get("/profile", userAuth, async(req,res) =>{
   try{ 

    const user = req.user;
    res.send(user);}
    catch(err){
        res.status(400).send("Error saving the use:" + err.message);
    }


})

app.post("/sendConnectionRequest", userAuth, async(req,res)=>{

    const user = req.user;
    console.log("Request sent successfully!!");
    res.send(user.firstName+" sent the connection request");
} );
//get user by email
app.get("/user", async (req, res)=>{
    const userEmail = req.body.emailId;
    

    try{
        const user = await User.findOne({ emailId: userEmail});
        if(!user){
            res.status(404).send("User not found");
        }
        else{
             res.send(user);
        }
        
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
});
//Feed API - GET /feed - get all the users from the database
app.get("/feed", async (req,res) =>{
try{
        const user = await User.find({});
        res.send(user);
        
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})

//Delete API

app.delete("/user", async (req, res)=>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted successfully");
        
    }
    catch(err){
        res.status(400).send("Something went wrong")
    }
})

//Update the data of the user
app.patch("/user", async (req, res)=>{
    
    const userId = req?.params?.userId;
    const data = req.body;

    
    try{
        const ALLOWED_UPDATES = ["userId", "photoYRL", "about", "gender","age", "skills"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed){
        throw new Error("Update not allowed");
    }
    if(data?.skills.length >10){
        throw new Error ("Update not allowed");
    }

         await User.findByIdAndUpdate({_id: userId}, data, {
            returnDocument: "after",
            runValidators: true,
         });
        res.send("User updated successfully");
        
    }
    catch(err){
        res.status(400).send("Update Failed" + err.message);
    }
})



//proper way to connecting the database 
connectDB()
.then(()=>{
    console.log("Database connection successfull");
    app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000 ...")
});
}).catch(err=>{
console.log("Database connection has an error");
})
