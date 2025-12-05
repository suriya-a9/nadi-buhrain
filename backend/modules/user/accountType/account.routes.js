const express = require("express");
const { addAccountType } = require("./account.controller");
const auth = require('../../../middleware/authMiddleware');

const router = express.Router();

router.post("/add", auth, addAccountType);

module.exports = router;
