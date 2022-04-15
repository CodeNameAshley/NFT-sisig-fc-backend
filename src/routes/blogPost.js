const express = require('express');
const router = express.Router()

const createBlogPost = require('../controllers/blogPost');

router.post('/', createBlogPost.create)

module.exports = router;