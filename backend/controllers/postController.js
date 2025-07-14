const Post = require("../models/Post");

exports.createPost = async (req, res) => {
  const { title, content, image, category } = req.body;
  try {
    const newPost = await Post.create({
      title,
      content,
      image,
      category,
      author: req.user._id, // from authMiddleware
    });
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!post) return res.status(404).json({ msg: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not authorized" });
    }
    await post.deleteOne();
    res.json({ msg: "Post deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
