const Post = require("../models/postModel");
const Like = require("../models/likeModel");

exports.likePost = async (req, res) => {
    try {
      // fetch data fromreq body
      const { post, user } = req.body;
  
      //create a comment object
      const like = new Like({
        post,
        user,
      
      });
  
      //save the new  comment into database
      const savedLike= await like.save();
  
      // find the post by id , add the new comment to its comments array
      const updatedPost = await Post.findByIdAndUpdate(
        post,
        { $push: { likes: savedLike._id } },
        { new: true }
      ).populate("likes") // iska matlab hai , we have comments id , but wee want actuaal documnet therefdire we use poppulate 
      .exec(); // execurting this query
  
      // We want to update(tat is to add the id in the array of of comments  of this new comment) the comments array of the Post
      // But Before updating() we nbeed to find the post on which we are commenting
      //For that  Post.findByIdAndUpdate
      // post -> it is acting as id by which we are going to find the post
      // NEW SYNTAX
  
      // {{$push} -> it is used to uupdate /push the         and {$pull} -> trhis is used to delete }
      // comments ki array me savedmment._id ko dall diya
      // new true -> iska matlab hota hai jab sara kaam h jaega to iske badd jop updated document hoga wo mil jaega'
      
      res.json({
        post:updatedPost,
      })
  
    } catch(error) {
      return res.status(500).json({
        error: "Errorr while doinmg like",
      });
    }
  };
  
  exports.unLikePost=async(req,res) =>{
    try{
      const{post,like}=req.body;
     // pehle like ke collection me se delete kiya 
      const deletedLike = await Like.findOneAndDelete({post:post , _id:like} )
      // nopw posts ke arraay se bhi delete lkiya 
      const updatedPost = await Post.findByIdAndUpdate(post,{$pull:{likes :deletedLike._id} } ,{new: true});
      
      res.json({
        post : updatedPost,
      })

    }
   catch(error) {
      return res.status(500).json({
        error: "Errorr while unliking the post",
      });
    }
  }

  