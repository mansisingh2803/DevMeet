const mongoose = require('mongoose');

//this below is returning the promise (whether the connection is successfully establish or not) because of that we are using async/await for handling the situation
const connectDB = async() =>{
    await mongoose.connect(
        "mongodb+srv://mansisingh28:BgzIOkbEiMk1N7zI@mansinode.edndh2l.mongodb.net/devMeet"
        
    );
}

//this is not the good way to connect the db as database is not connected and server started listening
// connectDB().then(()=>{
//     console.log("Database connection successfull")
// }).catch(err=>{
// console.log("Database connection has an error");
// })

module.exports = connectDB;