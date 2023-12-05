const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { isAuthenticated } = require("../middleware/auth");
const upload = require("../multer/multerForPost");
const fs = require('fs').promises


router.get("/check", (req, res) => {
    res.json({
        msg: "user api testing"
    })
})

// Get all posts
router.post("/allPost", upload.single('post'), isAuthenticated, async (req, res) => {
    try {
        const post = await Post.find().populate(
            "owner likes comments.user"
        );
        return res.status(200).json({ success: true, post: post.reverse() });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Create a new post
router.post("/addPost", isAuthenticated, upload.single('post'), async (req, res) => {
    try {

        const { path, filename } = req.file
        console.log("Post : ", User.filename)

        let newPost = {
            caption: req.body.caption,
            image: {
                filename,
                path,
            },
            owner: req.user._id,
        };

        // post created and save in db:
        const post = await Post.create(newPost);
        // adding post id in user Schema ...
        const user = await User.findById(req.user._id);
        user.posts.push(post._id);
        await user.save();

        return res.json({ success: true, message: "Post Uploaded" });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: error.message, error: error });
    }
});

// like and unlike  the  post
router.post("/like/:id", isAuthenticated, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res
                .status(404)
                .json({ success: false, message: "Post not found" });
        }

        // like or unlike:
        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id);
            post.likes.splice(index, 1);

            await post.save();
            return res.status(200).json({ success: true, message: "Post Unlike" });
        } else {
            post.likes.push(req.user._id);
            await post.save();

            return res.status(200).json({ success: true, message: "Post Like" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});

// Delete post By ID
router.delete("/deletePost/:id", isAuthenticated, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res
                .status(404)
                .json({ success: false, message: "Post not found" });
        }

        if (post.owner.toString() != req.user._id) {
            return res.status(401).json({ success: false, message: "UnAuthorized" });
        }

        // remove post from post folder:
        await fs.unlink(post.image.path);

        // remove id of post from user schema:
        const user = await User.findById(req.user._id);
        const index = user.posts.indexOf(req.params.id);
        user.posts.splice(index, 1);
        await user.save();

        await post.remove();

        res.status(200).json({
            success: true,
            message: "Post Deleted",
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

// Add or Edit Comment
router.put("/addComment/:id", isAuthenticated, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res
                .status(404)
                .json({ success: false, message: "Post not found" });
        }

        let commentIndex = -1;

        // Comment exist or not?
        post.comments.forEach((ele, index) => {
            if (ele.user.toString() === req.user._id.toString()) {
                commentIndex = index;
            }
        });

        if (commentIndex !== -1) {
            post.comments[commentIndex].comment = req.body.comment;
            await post.save();
            return res
                .status(200)
                .json({ success: true, message: "Comment Updated" });
        } else {
            post.comments.push({ user: req.user._id, comment: req.body.comment });
            await post.save();
            return res.status(200).json({ success: true, message: "Comment Added" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
module.exports = router;
