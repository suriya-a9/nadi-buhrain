const express = require("express");
const { addBlock, listRoadWithBlock } = require("./block.controller");
const auth = require("../../../middleware/authMiddleware");

const router = express.Router();

router.post("/add", auth, addBlock);
router.get("/", listRoadWithBlock);

module.exports = router;
