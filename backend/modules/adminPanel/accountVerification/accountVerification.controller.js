const UserAccount = require('../../userAccount/userAccount.model');
const Points = require('../points/points.model');

exports.verifyAccount = async (req, res, next) => {
    const { userId, status } = req.body;
    try {
        if (!userId || !status) {
            return res.status(400).json({ message: "userId and status required" });
        }
        if (!["verified", "rejected", "processing"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }

        const user = await UserAccount.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let updateFields = { accountVerification: status };

        if (status === "verified") {
            const pointsDoc = await Points.findOne({ accountType: user.accountTypeId });
            if (pointsDoc) {
                updateFields.points = pointsDoc.points;
            }
        }

        const result = await UserAccount.findByIdAndUpdate(
            userId,
            updateFields,
            { new: true }
        );
        res.status(200).json({ message: "Account verification updated", data: result });
    } catch (err) {
        next(err);
    }
}

exports.verificaionAccountList = async (req, res, next) => {
    try {
        const accountList = await UserAccount.find({ accountVerification: "not verified" });
        res.status(200).json({
            data: accountList
        })
    } catch (err) {
        next(err)
    }
}