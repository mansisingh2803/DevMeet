const express = require('express');
const {validateSignUpDate}  = require("../utils/validation");
const User = require("../models/users");
const bcrypt = require("bcrypt");
const {userAuth} = require("../middlewares/auth");
const authRouter = express.Router();
authRouter.post("/signup", async (req, res) =>{
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

authRouter.post("/login", async (req, res) =>{
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

authRouter.post("/logout",async(req,res) =>{
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successfully!!");
})

module.exports = authRouter;