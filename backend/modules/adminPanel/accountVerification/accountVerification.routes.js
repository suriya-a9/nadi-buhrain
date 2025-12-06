const { verifyAccount, verificaionAccountList } = require('./accountVerification.controller');
const express = require('express');
const router = express.Router();

router.post('/', verifyAccount);
router.get('/list', verificaionAccountList);

module.exports = router;