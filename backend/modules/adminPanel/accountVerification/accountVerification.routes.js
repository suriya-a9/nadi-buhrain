const { verifyAccount } = require('./accountVerification.controller');
const express = require('express');
const router = express.Router();

router.post('/', verifyAccount);

module.exports = router;