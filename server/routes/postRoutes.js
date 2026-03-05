const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const postController = require('../controller/postController');

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private
router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('excerpt').optional().isLength({ max: 500 }).withMessage('Excerpt cannot exceed 500 characters'),
  body('featured_image').optional().isURL().withMessage('Featured image must be a valid URL'),
  body('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Invalid status')
], postController.createPost);

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get('/', postController.getPosts);

// @route   GET /api/posts/my
// @desc    Get my posts
// @access  Private
router.get('/my', postController.getMyPosts);

// @route   GET /api/posts/:id
// @desc    Get post by ID
// @access  Public
router.get('/:id', postController.getPostById);

// @route   PUT /api/posts/:id
// @desc    Update post
// @access  Private
router.put('/:id', [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('content').optional().notEmpty().withMessage('Content cannot be empty'),
  body('excerpt').optional().isLength({ max: 500 }).withMessage('Excerpt cannot exceed 500 characters'),
  body('featured_image').optional().isURL().withMessage('Featured image must be a valid URL'),
  body('status').optional().isIn(['draft', 'published', 'archived']).withMessage('Invalid status')
], postController.updatePost);

// @route   DELETE /api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', postController.deletePost);

// @route   GET /api/posts/scheduled
// @desc    Get scheduled posts
// @access  Private
router.get('/scheduled', postController.getScheduledPosts);

module.exports = router;