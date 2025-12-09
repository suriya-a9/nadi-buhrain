const { verifyAccount, verificaionAccountList, usersList } = require('./accountVerification.controller');
const express = require('express');
const router = express.Router();

router.post('/', verifyAccount);
router.get('/list', verificaionAccountList);
router.get('/all-user-list', usersList);

module.exports = router;