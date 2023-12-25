const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: false
    },
    image: { 
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
