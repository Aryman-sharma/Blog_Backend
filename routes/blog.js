const express =require("express");
const router = express.Router();

// import controller
const{createComment}=require("../controllers/CommentController");
const { createPost } = require("../controllers/PostController");
const{getAllPosts}=require("../controllers/PostController");
const{likePost,unLikePost}=require("../controllers/LikeController")
// mapping 
router.post("/comments/create",createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like",likePost);
router.post("/likes/unlike",unLikePost);


// exports 
module.exports = router;