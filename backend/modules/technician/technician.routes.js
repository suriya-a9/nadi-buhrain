const { assignedServices, servicesList } = require('./technician.controller');
const auth = require('../../middleware/authMiddleware');
const express = require('express');

const router = express.Router();

router.post('/assigned-list', auth, assignedServices);
router.post('/list', auth, servicesList);

module.exports = router;