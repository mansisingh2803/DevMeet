const jwt = require("jsonwebtoken");
const User = require("../models/users");
const userAuth = async (req,res,next)=>{
// read the token from the req cookies
try {
const {token} = req.cookies;
if(!token){
    return res.status(401).send("Please Login!!");
}
const decodedObj = await jwt.verify(token, "MAN@SINGH$2803");

const {_id} = decodedObj;
const user = await User.findById(_id);

if(!user){
    throw new Error("User not fpound");
}
req.user = user;
next();
}
 catch(err){
        res.status(400).send("Error saving the use:" + err.message);
    }

//validate the token
//find the user
}

module.exports = {
    userAuth,
};