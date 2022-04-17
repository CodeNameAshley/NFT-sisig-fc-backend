const express = require('express');
const router = express.Router()

const blogPost = require('../controllers/blogPost');

router.post('/', blogPost.create)
router.get('/', blogPost.read)

module.exports = router;