const { newUserServiceRequest, updateServiceStatus, assignTechnician } = require('./userServiceController.controller');
const auth = require('../../../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

router.get('/', newUserServiceRequest);
router.post('/update-status', auth, updateServiceStatus);
router.post('/assign-technician', auth, assignTechnician);

module.exports = router;