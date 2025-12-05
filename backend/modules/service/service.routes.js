const express = require('express');
const { createService, deleteService, listService, updateService } = require('./service.controller');
const auth = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/add', auth, createService);
router.post('/edit', auth, updateService);
router.post('/delete', auth, deleteService);
router.post('/', listService);

module.exports = router;