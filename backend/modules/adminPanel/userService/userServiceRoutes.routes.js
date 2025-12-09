const { newUserServiceRequest, updateServiceStatus, assignTechnician, technicianRespond } = require('./userServiceController.controller');
const auth = require('../../../middleware/authMiddleware');
const express = require('express');
const router = express.Router();

router.get('/', newUserServiceRequest);
router.post('/update-status', auth, updateServiceStatus);
router.post('/assign-technician', auth, assignTechnician);
router.post('/technician-respond', auth, technicianRespond);

module.exports = router;