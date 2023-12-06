const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    title: {
        type: String,
        default: null
    },
    body: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    active: {
        type: Boolean,
        default: true
    },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: { type: [Number], default: [0, 0] },
    },
});

module.exports = mongoose.model("Post", postsSchema); 
