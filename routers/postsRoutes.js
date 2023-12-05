const router = require('express').Router();
const posts = require('../models/posts');
const auth = require("../middleware/auth");


const {
    createPostData,
    editpostData,
    getAllPosts,
    deletePostData

}=require('../controller/postsController');

router.post("/createPostData",auth,createPostData)
router.patch("/editCart",editpostData)
router.get("/getAllCart",getAllPosts)
router.delete("/:id", deletePostData);

  

module.exports = router;