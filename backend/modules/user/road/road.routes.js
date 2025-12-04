const express = require("express");
const { addRoad, listRoad } = require("./road.controller");
const auth = require("../../../middleware/authMiddleware");

const router = express.Router();

router.post("/add", auth, addRoad);
router.get("/", listRoad);

module.exports = router;
