const express = require('express');
const router = express.Router()

const managers = require('../controllers/managers');

router.post('/', managers.createManager)
router.get('/', managers.readAllManagers)

module.exports = router;