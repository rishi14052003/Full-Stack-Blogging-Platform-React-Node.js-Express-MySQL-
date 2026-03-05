const Comment = require('../models/commentModel');
const { validationResult } = require('express-validator');

// @desc    Create a new comment
// @route   POST /api/comments
// @access  Private
const createComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content, post_id, parent_id } = req.body;
    const author_id = req.user.id; // This would come from auth middleware

    const comment = await Comment.create({
      content,
      post_id,
      author_id,
      parent_id
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get comments by post ID
// @route   GET /api/comments/post/:postId
// @access  Public
const getCommentsByPost = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    const postId = req.params.postId;

    const comments = await Comment.findByPostId(postId, {
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    const total = await Comment.countByPostId(postId);

    res.json({
      comments,
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

// @desc    Get comment by ID
// @route   GET /api/comments/:id
// @access  Public
const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Private
const updateComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { content } = req.body;
    const userId = req.user.id; // This would come from auth middleware

    // First check if comment exists and user owns it
    const existingComment = await Comment.findById(req.params.id);
    if (!existingComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (existingComment.author_id !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    const updated = await Comment.update(req.params.id, { content });

    if (updated) {
      const updatedComment = await Comment.findById(req.params.id);
      res.json(updatedComment);
    } else {
      res.status(400).json({ message: 'Failed to update comment' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Private
const deleteComment = async (req, res) => {
  try {
    const userId = req.user.id; // This would come from auth middleware

    // First check if comment exists and user owns it
    const existingComment = await Comment.findById(req.params.id);
    if (!existingComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (existingComment.author_id !== userId && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    const deleted = await Comment.delete(req.params.id);

    if (deleted) {
      res.json({ message: 'Comment deleted successfully' });
    } else {
      res.status(400).json({ message: 'Failed to delete comment' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get my comments
// @route   GET /api/comments/my
// @access  Private
const getMyComments = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    const userId = req.user.id; // This would come from auth middleware

    const comments = await Comment.findByUserId(userId, {
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      comments,
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

// @desc    Get replies to a comment
// @route   GET /api/comments/:id/replies
// @access  Public
const getReplies = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const offset = (page - 1) * limit;
    const commentId = req.params.id;

    const replies = await Comment.getReplies(commentId, {
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      replies,
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
  createComment,
  getCommentsByPost,
  getCommentById,
  updateComment,
  deleteComment,
  getMyComments,
  getReplies
};