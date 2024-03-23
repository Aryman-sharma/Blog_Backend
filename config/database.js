const mongoose = require("mongoose");
require("dotenv").config();

function dbConnect()
{
    mongoose.connect(process.env.DATABASE_URL,{


    })
    .then(()=>console.log("connection Succesfull"))
    .catch((error)=>{
        console.log("Issue while Connecting");
        console.log(error);
        process.exit(1);
    });
}

module.exports = dbConnect;










