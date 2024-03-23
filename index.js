const express =require('express');
const app =express();

app.use(express.json()); // middleware 

// dotenv loads process object with all the data 
require("dotenv").config();


const PORT = process.env.PORT || 4000;
const dbConnect = require("./config/database"); // import db 
dbConnect();//db call

/// import routes 
const blog = require("./routes/blog")

/// mount routes 
app.use("/api/v1", blog);


// server started 
app.listen(PORT,()=>
{
    console.log(`server starrted successfully at ${PORT}`);
})
// default route
app.get("/", (req,res) => {
    res.send(`<h1>Blog Home Page</h1>`);
})
