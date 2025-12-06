const Points = require('./points.model');

exports.addPoints = async (req, res, next) => {
    const { points, accountType } = req.body;
    try {
        const pointsData = await Points.create({
            points,
            accountType
        })
        res.status(201).json({
            message: "points added",
            data: pointsData
        })
    } catch (err) {
        next(err);
    }
}

exports.listPoints = async (req, res, next) => {
    try {
        const pointsList = await Points.find();
        res.status(200).json({
            data: pointsList
        })
    } catch (err) {
        next(err)
    }
}

exports.updatePoints = async (req, res, next) => {
    const { id, ...updateFields } = req.body;
    try {
        await Points.findByIdAndUpdate(
            id,
            updateFields,
            { new: true }
        )
        res.status(200).json({
            message: "Updated successfully"
        })
    } catch (err) {
        next(err)
    }
}