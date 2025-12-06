const express = require('express');
const { addPoints, listPoints, updatePoints } = require('./points.controller');

const router = express.Router();

router.post('/add', addPoints);
router.get('/', listPoints);
router.post('/update', updatePoints);

module.exports = router;