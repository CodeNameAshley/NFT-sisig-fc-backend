const express = require('express');
const router = express.Router()

const managers = require('../controllers/managers');

router.post('/', managers.createManager)

module.exports = router;