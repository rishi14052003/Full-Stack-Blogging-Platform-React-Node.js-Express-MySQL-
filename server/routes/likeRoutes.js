const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const likeController = require('../controller/likeController');

// @route   POST /api/likes/toggle
// @desc    Like or unlike a post
// @access  Private
router.post('/toggle', [
  body('post_id').isInt().withMessage('Post ID must be an integer')
], likeController.toggleLike);

// @route   POST /api/likes
// @desc    Like a post
// @access  Private
router.post('/', [
  body('post_id').isInt().withMessage('Post ID must be an integer')
], likeController.likePost);

// @route   DELETE /api/likes
// @desc    Unlike a post
// @access  Private
router.delete('/', [
  body('post_id').isInt().withMessage('Post ID must be an integer')
], likeController.unlikePost);

// @route   GET /api/likes/post/:postId
// @desc    Get likes by post ID
// @access  Public
router.get('/post/:postId', likeController.getLikesByPost);

// @route   GET /api/likes/post/:postId/count
// @desc    Get like count for a post
// @access  Public
router.get('/post/:postId/count', likeController.getLikeCount);

// @route   GET /api/likes/check/:postId
// @desc    Check if user liked a post
// @access  Private
router.get('/check/:postId', likeController.checkUserLike);

// @route   GET /api/likes/my
// @desc    Get my liked posts
// @access  Private
router.get('/my', likeController.getMyLikes);

module.exports = router;