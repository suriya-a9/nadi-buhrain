const express = require('express');
const { addIntro, getIntro, updateIntro } = require('./intro.controller');
const auth = require('../../../middleware/authMiddleware');

const router = express.Router();

router.post('/add', auth, addIntro);
router.get('/', getIntro);
router.post('/update', auth, updateIntro);

module.exports = router;