const mongoose = require("mongoose");

// Route Handler
const commentSchema = new mongoose.Schema(
    {   
        // kis post pe comment kiya hai 
        post:{
            //this is storing an ID 
            type : mongoose.Schema.Types.ObjectId,
            ref:"Post", // reference to the post model
        },
        // klis user nbe comment kiya hai
        user: {
            type:String,
            required:true,
        },
        // kya comment kiya hai 
        body : {
            type:String,
            required:true
        }

    }
)

module.exports = mongoose.model("Comment",commentSchema);

