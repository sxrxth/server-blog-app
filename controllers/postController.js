const Post = require('../Models/postSchema');

// Add Post
exports.addPost = async (req, res) => {
    console.log("Inside add post function");
    const userId = req.payload;
    const postImage = req.file.filename;
    const { title, categories, desc,username } = req.body;

    try {
        const existingPost = await Post.findOne({ title });

        if (existingPost) {
            res.status(406).json("Post already exists!!! Upload another");
        } else {
            const newPost = new Post({
                title, categories, desc, image: postImage, username,userId
            });

            await newPost.save();
            res.status(200).json(newPost);
        }
    } catch (err) {
        res.status(401).json(err);
    }
};

// Get User Posts - Token required
exports.allUserPosts = async (req, res) => {
    const userId = req.payload;
    try {
        const userPosts = await Post.find({ userId });
        res.status(200).json(userPosts);
    } catch (err) {
        res.status(401).json(err);
    }
};

// Get All Posts - Token required
exports.getAllPosts = async (req, res) => {
   
    try {
        const allPosts = await Post.find();
        res.status(200).json(allPosts);
    } catch (err) {
        res.status(401).json(err);
    }
};

// Get Home Posts
exports.getHomePosts = async (req, res) => {
    try {
        const homePosts = await Post.find().limit(3);
        res.status(200).json(homePosts);
    } catch (err) {
        res.status(401).json(err);
    }
};

// Edit Post
exports.editPostController = async (req, res) => {
    const { id } = req.params;
    const userId = req.payload;
    const { title, categories, desc, username,image } = req.body;
    const uploadPostImage = req.file ? req.file.filename : image;

    try {
        const updatePost = await Post.findByIdAndUpdate({ _id: id }, {
            title, categories, desc, image: uploadPostImage,username, userId
        }, { new: true });
        await updatePost.save();
        res.status(200).json(updatePost);
    } catch (err) {
        res.status(401).json(err);
    }
};

// Delete Post
exports.deletePostController = async (req, res) => {
    const { id } = req.params;
    try {
        const removePost = await Post.findByIdAndDelete({ _id: id });
        res.status(200).json(removePost);
    } catch (err) {
        res.status(401).json(err);
    }
};
