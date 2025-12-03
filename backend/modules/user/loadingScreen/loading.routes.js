const express = require("express");
const { uploadLoadingScreen, loadingScreen } = require("./loading.controller");
const auth = require("../../../middleware/authMiddleware");
const upload = require("./../../../middleware/fileUpload");

const router = express.Router();

router.post("/upload", auth, upload.single("image"), uploadLoadingScreen);
router.post("/loading-screen", loadingScreen);

module.exports = router;
