const express = require('express');
const connectDB = require("./config/database");
const app = express();
const User = require("./models/users");

//This will convert the data to JS object worked as a middleware
app.use(express.json());

app.post("/signup", async (req, res) =>{

    //create a new instance of the user model
   const user = new User(req.body);

    try{
        await user.save();
    res.send("User added successfully");}
    catch(err){
        res.status(400).send("Error saving the use:" + err.message);
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
