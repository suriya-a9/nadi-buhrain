const Loading = require("./loading.model");
const logger = require('../../../logger');

exports.uploadLoadingScreen = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const saved = await Loading.create({ image: req.file.filename });

    return res.json({
      message: "File uploaded successfully",
      file: req.file.filename,
      data: saved,
    });
  } catch (err) {
    next(err);
  }
};

exports.loadingScreen = async (req, res, next) => {
  try {
    const loadingData = await Loading.find();
    const loadingScreenImage = loadingData[0].image;
    res.status(200).json({
      data: loadingScreenImage,
    });
  } catch (err) {
    next(err);
  }
};
