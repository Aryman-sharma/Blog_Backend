// import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async (req, res) => {
  try {
    // fetch data fromreq body
    const { post, user, body } = req.body;

    //create a comment object
    const comment = new Comment({
      post,
      user,
      body,
    });

    //save the new  comment into database
    const savedComment = await comment.save();

    // find the post by id , add the new comment to its comments array
    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    ).populate("comments") // iska matlab hai , we have comments id , but wee want actuaal documnet therefdire we use poppulate 
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
      error: "Errorr while Creating comment",
    });
  }
};
