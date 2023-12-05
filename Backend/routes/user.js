const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const { isAuthenticated } = require("../middleware/auth");
const path = require("path")
const upload = require("../multer/multerSetup");


router.get("/check", (req, res) => {
  res.json({
    msg: "user api testing"
  })
})

router.post("/me", isAuthenticated, async (req, res) => {
  try {
    let user = await User.findById(req.user._id).populate(
      "posts followers following"
    );

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "your email not exits:",
    });
  }
});

router.post("/register", upload.single('avatar'), async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { filename, path: filePath } = req.file;

    // check user with this email exist or not:
    let user = await User.findOne({ email });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    // create new user now and save it in data base:
    user = await User.create({
      name,
      email,
      password,
      avatar: { filename: filename, path: path.join(__dirname, '..', filePath) },
    });

    const token = await user.generateToken();

    return res
      .status(200)
      .json({
        success: true,
        token,
        user
      });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // check : user exit with this email or not.  => by  findOne function:
    let user = await User.findOne({ email })
      .select("+password")
      .populate("posts followers following");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "your email does not exits:",
      });
    }

    // check password:
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password",
      });
    }

    const token = await user.generateToken();

    // cookie set with expire date : this cookie expire after 90 days : formula :: days(eg:4)*hours(24)*minutes(60)*second(60)*milliSecond(1000)
    return res
      .status(200)
      .json({
        success: true,
        token,
        user,
      });
  } catch (err) {
    return res.status(500).send({ success: false, message: err.message });
  }
});

router.post("/otherUser/:id", isAuthenticated, async (req, res) => {
  try {
    let user = await User.findById(req.params.id).populate(
      "followers following"
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Exit" });
    }

    let posts = await Post.find({ owner: user._id }).populate(
      "likes comments.user"
    );

    user = {
      _id: user._id,
      name: user.name,
      avatar: user.avatar,
      email: user.email,
      posts: posts,
      followers: user.followers,
      following: user.following,
      createdAt: user.createdAt,
    };

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "your email not exits:",
    });
  }
});

router.put("/updateProfile", isAuthenticated, async (req, res) => {
  try {
    const { name, email, newPassword } = req.body;

    const user = await User.findById(req.user._id).select("+password")

    if (name) user.name = name;
    if (email) user.email = email;

    if (newPassword) {
      const isMatch = await user.matchPassword(oldPassword);

      if (!isMatch) {
        return res
          .status(200)
          .json({ success: false, message: "Incorrect Old Password" });
      }
      user.password = newPassword;
    }

    await user.save();

    return res.status(200).json({ success: true, message: "Profile Updated" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// Get All User
router.post("/allUser", async (req, res) => {
  try {
    let users = await User.find({}).populate("posts followers following");

    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});


// --------------- Pending All--------------------

// Search User by name
router.post("/getAllUser", isAuthenticated, async (req, res) => {
  try {
    let user = await User.find({
      name: { $regex: req.query.name, $options: `i` },
    });

    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/logout", isAuthenticated, (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged Out",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/follow/:id", isAuthenticated, async (req, res) => {
  try {
    let loggedUser = await User.findById(req.user._id);
    let userToFollow = await User.findById(req.params.id);
    if (!userToFollow) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (req.params.id.toString() === req.user._id.toString()) {
      return res
        .status(303)
        .json({ success: false, message: "You can't follow to self" });
    }

    // Follow or unFollow:
    if (loggedUser.following.includes(req.params.id)) {
      // data changing of logged user:   UN FOLLOW
      const index = loggedUser.following.indexOf(req.params.id);
      loggedUser.following.splice(index, 1);
      await loggedUser.save();

      // data changing of follow to user:
      const index2 = userToFollow.followers.indexOf(req.user._id);
      userToFollow.followers.splice(index2, 1);
      await userToFollow.save();

      return res
        .status(200)
        .json({ success: true, message: "UnFollow to user" });
    } else {
      loggedUser.following.push(req.params.id);
      userToFollow.followers.push(req.user._id);

      await loggedUser.save();
      await userToFollow.save();

      return res.status(200).json({ success: true, message: "Follow to user" });
    }
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});

router.post("/postOfFollowing", isAuthenticated, async (req, res) => {
  try {
    // let user = await User.findById(req.user._id).populate("following",'posts');
    let user = await User.findById(req.user._id);
    let posts = await Post.find({ owner: { $in: user.following } }).populate(
      "owner likes comments.user"
    );

    return res.status(200).json({ success: true, posts: posts.reverse() });
  } catch (error) {
    return res.status(500).json({
      success: false,
      n: error.message,
    });
  }
});



module.exports = router;
