const express = require('express');

const app = express();

app.get("/user" , (req,res) =>{
    res.send({firstName: "Mansi", lastName:"Singh"});
});
app.post("/user",(req,res)=>{
    console.log("Save the data in database");
    res.send("Data is successfully saved");
})
app.listen(3000, ()=>{
    console.log("Server is successfully listening on port 3000 ...")
});