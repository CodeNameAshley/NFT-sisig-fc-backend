const express = require('express');
const router = express.Router()

const blogPost = require('../controllers/blogPost');

router.post('/', blogPost.createBlogPost)
router.get('/', blogPost.readAllBlogPost)
router.get('/:blogId', blogPost.readByBlogId)
router.patch('/:blogId', blogPost.updateByBlogId)
router.delete('/:blogId', blogPost.deleteByBlogId)

module.exports = router;