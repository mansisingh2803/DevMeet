const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required:true,
        maxLength:50,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email address:" + value);
            }
        }
        
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate(value){
            if(!["male", "female", "others"].includes(value)){
              throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl:{
        type:String,
        default: "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659652_640.png"
    },
    bio:{
        type:String,
        default: "This is a default about the user!"
    },
    skills:{
        type:[String]
    },
},
{
    timestamps: true,
}
);

userSchema.methods.getJWT = async function (){
    const user = this;
    const token = await jwt.sign({_id: user._id}, "MAN@SINGH$2803", {expiresIn: '30d'});
             return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, user.password);
    return isPasswordValid;
}
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
