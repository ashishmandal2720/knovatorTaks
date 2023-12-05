const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    title: {
        type: String,
        default: null
    },
    body: {
        type: String,
        // Remove the unique constraint if multiple posts can have the same body
        // unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Make sure this matches your User model name
    },
    active: { 
        type: Boolean,
        default: true
    },
    geoLocation: {
        latitude: Number,
        longitude: Number
    },
});

module.exports = mongoose.model("Post", postsSchema); // Corrected the model name to "Post"
