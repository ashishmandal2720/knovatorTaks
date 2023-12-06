const { json } = require('body-parser');

const Posts = require('../models/posts');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Posts.find({ createdBy: req.user._id });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving blog posts' });
    }
};

const getOnePosts = async (req, res) => {
    const postId = req.params.postId;
    try {
        const post = await Posts.findOne({ _id: postId, createdBy: req.user._id });
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: 'Blog post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving blog post' });
    }
};

const deletePostData = async (req, res) => {
    const postId = req.params.postId;

    try {
        const deletedPost = await Posts.findOneAndDelete({ _id: postId, createdBy: req.user._id });

        if (deletedPost) {
            res.json({ message: 'post deleted successfully' });
        } else {
            res.status(404).json({ error: 'post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error deleting  post' });
    }
};

const editpostData = async (req, res) => {
    const postId = req.params.postId;
    const { title, body, longitude, latitude, active } = req.body;
    try {
        const updatedPost = await Posts.findOneAndUpdate(
            { _id: postId, createdBy: req.user._id },
            {
                title,
                body,
                active,
                location: { coordinates: [longitude, latitude] },
            },
            { new: true }
        );
        if (updatedPost) {
            res.json(updatedPost);
        } else {
            res.status(404).json({ error: 'Blog post not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error updating blog post' });
    }
};

const createPostData = async (req, res) => {
    const { title, body, latitude, longitude, createdBy } = req.body;

    try {
        if (!title || !body || !latitude || !longitude) {
            return res.status(400).json({ error: 'Please provide all required fields' });
        }
        const newPost = await Posts.create({
            title,
            body,
            createdBy: req.user._id,
            location: { type: 'Point', coordinates: [longitude, latitude] },
        });
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating blog post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createPostData,
    editpostData,
    getAllPosts,
    deletePostData,
    getOnePosts
};