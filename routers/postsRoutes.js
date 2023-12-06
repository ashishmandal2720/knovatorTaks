const router = require('express').Router();
const posts = require('../models/posts');
const { requireAuth } = require('../middleware/auth'); 


const {
    createPostData,
    editpostData,
    getAllPosts,
    getOnePosts,
    deletePostData

} = require('../controller/postsController');

router.post("/createPostData", requireAuth, createPostData)
router.put("/editPost/:postId", requireAuth, editpostData)
router.get("/getAll", requireAuth, getAllPosts)
router.get("/getOne/:postId", requireAuth, getOnePosts)
router.delete("/:id", requireAuth, deletePostData);



module.exports = router;