const express = require('express');
const router = express.Router()

const managers = require('../controllers/managers');

router.post('/', managers.createManager)
router.get('/', managers.readAllManagers)
router.patch('/:managerId', managers.updateByManagerId);

module.exports = router;