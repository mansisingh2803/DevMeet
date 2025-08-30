const express = require('express');
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
//This will convert the data to JS object worked as a middleware
app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/authRouter");
const profileRouter = require("./routes/profileRouter");
const requestRouter = require("./routes/requests");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

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
