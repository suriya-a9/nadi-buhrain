const express = require("express");
const { addAccountType } = require("./account.controller");

const router = express.Router();

router.post("/add", addAccountType);

module.exports = router;
