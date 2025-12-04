const Block = require("./block.model");
const Road = require("../road/road.model");

exports.addBlock = async (req, res, next) => {
  const { roadId, name } = req.body;
  try {
    const blockData = await Block.create({
      roadId,
      name,
    });
    res.status(201).json({
      message: "Created successfully",
      data: blockData,
    });
  } catch (err) {
    next(err);
  }
};

exports.listRoadWithBlock = async (req, res) => {
  try {
    const data = await Road.aggregate([
      {
        $lookup: {
          from: "blocks",
          localField: "_id",
          foreignField: "roadId",
          as: "blocks",
        },
      },
    ]);

    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
