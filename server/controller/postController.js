const Post = require('../models/postModel');
const { validationResult } = require('express-validator');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, excerpt, featured_image, status = 'draft' } = req.body;
    const author_id = req.user.id; // This would come from auth middleware

    const post = await Post.create({
      title,
      content,
      excerpt,
      featured_image,
      author_id,
      status
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status = 'published', author_id } = req.query;
    const offset = (page - 1) * limit;

    const posts = await Post.findAll({
      status,
      limit: parseInt(limit),
      offset: parseInt(offset),
      author_id: author_id ? parseInt(author_id) : undefined
    });

    const total = await Post.count({ status, author_id });

    res.json({
      posts,
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

// @desc    Get post by ID
// @route   GET /api/posts/:id
// @access  Public
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, excerpt, featured_image, status } = req.body;
    const userId = req.user.id; // This would come from auth middleware

    // First check if post exists and user owns it
    const existingPost = await Post.findById(req.params.id);
    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (existingPost.author_id !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const updated = await Post.update(req.params.id, {
      title,
      content,
      excerpt,
      featured_image,
      status
    });

    if (updated) {
      const updatedPost = await Post.findById(req.params.id);
      res.json(updatedPost);
    } else {
      res.status(400).json({ message: 'Failed to update post' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    const userId = req.user.id; // This would come from auth middleware

    // First check if post exists and user owns it
    const existingPost = await Post.findById(req.params.id);
    if (!existingPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (existingPost.author_id !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    const deleted = await Post.delete(req.params.id);

    if (deleted) {
      res.json({ message: 'Post deleted successfully' });
    } else {
      res.status(400).json({ message: 'Failed to delete post' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get my posts
// @route   GET /api/posts/my
// @access  Private
const getMyPosts = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;
    const userId = req.user.id; // This would come from auth middleware

    const posts = await Post.findAll({
      author_id: userId,
      status: status || undefined,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const total = await Post.count({ 
      author_id: userId, 
      status: status || undefined 
    });

    res.json({
      posts,
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

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getMyPosts
};