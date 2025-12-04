const Road = require("./road.model");

exports.addRoad = async (req, res, next) => {
  const { name } = req.body;
  try {
    const roadData = await Road.create({
      name,
    });
    res.status(201).json({
      message: "Created successfully",
      data: roadData,
    });
  } catch (err) {
    next(err);
  }
};

exports.listRoad = async (req, res, next) => {
  try {
    const roadList = await Road.find();
    res.status(200).json({
      data: roadList,
    });
  } catch (err) {
    next(err);
  }
};
