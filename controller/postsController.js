const { json } = require('body-parser');

const Posts = require('../models/posts');


const getAllPosts = async (req, res) => {
    try {
        const getAllCart = await Cart.find({})
        .populate({
          path: 'userId',
        //   select: 'fullName', // Populate the 'user' field with 'fullName'
        })
        .populate({
            path: 'productId'
        });
        res.json({ cart: getAllCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deletePostData = async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.id)
        const a1 = await cart.deleteOne()
        res.send('deleted sucessfully')
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


const editpostData = async (req, res) => {
    const { userId, productId, price, quantity, size } = req.body;

    try {
        const updatedCart = await Cart.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { userId, productId, price, quantity, size  } },
            { new: true }
        );

        if (!updatedCart) {
            return res.json({ success: false, message: 'Product not found' });
        }

        return res.json({ success: true, product: updatedCart });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'An error occurred' });
    }
};



const createPostData = async (req, res) => {
    const { title,body,active,geoLocation  } = req.body;
    const createdBy = req.user._id; 

    try {
        const newPost = await Posts.create({
            title,body,createdBy,active,geoLocation
        });

        return res.json({ success: true, post: newPost });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'An error occurred' });
    }
};


// exports.createPost = (req, res) => {
//   const { title, body, latitude, longitude } = req.body;
//   const createdBy = req.user._id; // Assuming you are using Passport and the user is attached to the request

//   // Validate required fields
//   if (!title || !body || !latitude || !longitude) {
//     return res.status(400).json({ message: 'Please provide all required fields.' });
//   }

//   // Create a new post
//   const newPost = new Post({
//     title,
//     body,
//     createdBy,
//     geoLocation: {
//       latitude,
//       longitude
//     }
//   });

//   // Save the post to the database
//   newPost.save()
//     .then(post => res.status(201).json(post))
//     .catch(err => res.status(500).json({ error: err.message }));
// };





module.exports = {
    createPostData,
    editpostData,
    getAllPosts,
    deletePostData
}