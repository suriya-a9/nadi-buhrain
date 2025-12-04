const express = require('express');
const { addIntro, getIntro } = require('./intro.controller');
const auth = require('../../../middleware/authMiddleware');

const router = express.Router();

router.post('/add', auth, addIntro);
router.get('/', getIntro);

module.exports = router;