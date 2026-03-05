const Like = require('../models/likeModel');
const { validationResult } = require('express-validator');

// @desc    Like or unlike a post
// @route   POST /api/likes/toggle
// @access  Private
const toggleLike = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { post_id } = req.body;
    const user_id = req.user.id; // This would come from auth middleware

    const result = await Like.toggleLike(post_id, user_id);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Like a post
// @route   POST /api/likes
// @access  Private
const likePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { post_id } = req.body;
    const user_id = req.user.id; // This would come from auth middleware

    // Check if already liked
    const existingLike = await Like.findByPostAndUser(post_id, user_id);
    if (existingLike) {
      return res.status(400).json({ message: 'Post already liked' });
    }

    const like = await Like.create({ post_id, user_id });

    res.status(201).json({ message: 'Post liked successfully', like });
  } catch (error) {
    console.error(error);
    if (error.message === 'User already liked this post') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Unlike a post
// @route   DELETE /api/likes
// @access  Private
const unlikePost = async (req, res) => {
  try {
    const { post_id } = req.body;
    const user_id = req.user.id; // This would come from auth middleware

    const deleted = await Like.delete(post_id, user_id);

    if (deleted) {
      res.json({ message: 'Post unliked successfully' });
    } else {
      res.status(400).json({ message: 'Like not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get likes by post ID
// @route   GET /api/likes/post/:postId
// @access  Public
const getLikesByPost = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    const postId = req.params.postId;

    const likes = await Like.findByPostId(postId, {
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const total = await Like.countByPostId(postId);

    res.json({
      likes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get like count for a post
// @route   GET /api/likes/post/:postId/count
// @access  Public
const getLikeCount = async (req, res) => {
  try {
    const postId = req.params.postId;
    const total = await Like.countByPostId(postId);

    res.json({ post_id: postId, like_count: total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Check if user liked a post
// @route   GET /api/likes/check/:postId
// @access  Private
const checkUserLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id; // This would come from auth middleware

    const like = await Like.findByPostAndUser(postId, userId);

    res.json({ 
      post_id: postId, 
      user_id: userId, 
      is_liked: !!like 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get my liked posts
// @route   GET /api/likes/my
// @access  Private
const getMyLikes = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    const userId = req.user.id; // This would come from auth middleware

    const likes = await Like.findByUserId(userId, {
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      likes,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  toggleLike,
  likePost,
  unlikePost,
  getLikesByPost,
  getLikeCount,
  checkUserLike,
  getMyLikes
};