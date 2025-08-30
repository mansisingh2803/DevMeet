const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const User = require("../models/users");
const {validateEditProfileData} = require("../utils/validation")
profileRouter.get("/profile/view", userAuth, async(req,res) =>{
   try{ 

    const user = req.user;
    res.send(user);}
    catch(err){
        res.status(400).send("Error saving the use:" + err.message);
    }


});
profileRouter.patch("/profile/edit", userAuth, async (req, res)=>{
    try{
       if(!validateEditProfileData(req)){
        return res.status(400).send("Invalid request!!");
       }

        const loggedInUser = req.user;
        
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
       await loggedInUser.save();
       
       res.json({
        message: `${loggedInUser.firstName}, your profile is updated successfully`,
        data: loggedInUser,
       })
    }
    catch(err){
        res.status(400).send("Update Failed" + err.message);
    }
});




module.exports = profileRouter;