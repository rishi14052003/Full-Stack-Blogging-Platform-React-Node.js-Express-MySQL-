const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const commentController = require('../controller/commentController');

// @route   POST /api/comments
// @desc    Create a new comment
// @access  Private
router.post('/', [
  body('content').notEmpty().withMessage('Content is required'),
  body('post_id').isInt().withMessage('Post ID must be an integer'),
  body('parent_id').optional().isInt().withMessage('Parent ID must be an integer')
], commentController.createComment);

// @route   GET /api/comments/post/:postId
// @desc    Get comments by post ID
// @access  Public
router.get('/post/:postId', commentController.getCommentsByPost);

// @route   GET /api/comments/my
// @desc    Get my comments
// @access  Private
router.get('/my', commentController.getMyComments);

// @route   GET /api/comments/:id
// @desc    Get comment by ID
// @access  Public
router.get('/:id', commentController.getCommentById);

// @route   GET /api/comments/:id/replies
// @desc    Get replies to a comment
// @access  Public
router.get('/:id/replies', commentController.getReplies);

// @route   PUT /api/comments/:id
// @desc    Update comment
// @access  Private
router.put('/:id', [
  body('content').notEmpty().withMessage('Content cannot be empty')
], commentController.updateComment);

// @route   DELETE /api/comments/:id
// @desc    Delete comment
// @access  Private
router.delete('/:id', commentController.deleteComment);

module.exports = router;