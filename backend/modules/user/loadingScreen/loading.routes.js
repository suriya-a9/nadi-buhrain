const express = require("express");
const { uploadLoadingScreen, loadingScreen, updateLoadingScreen } = require("./loading.controller");
const auth = require("../../../middleware/authMiddleware");
const upload = require("./../../../middleware/fileUpload");

const router = express.Router();

router.post("/upload", auth, upload.single("image"), uploadLoadingScreen);
router.post("/loading-screen", loadingScreen);
router.post("/update", upload.single("image"), updateLoadingScreen);

module.exports = router;
