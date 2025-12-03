const express = require('express');
const { createService } = require('./service.controller');

const router = express.Router();

router.post('/add', createService);

module.exports = router;