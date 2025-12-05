const UserAccount = require('../../userAccount/userAccount.model');

exports.verifyAccount = async (req, res, next) => {
    const { userId, status } = req.body;
    try {
        if (!userId || !status) {
            return res.status(400).json({ message: "userId and status required" });
        }
        if (!["verified", "rejected", "processing"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value" });
        }
        const result = await UserAccount.findByIdAndUpdate(
            userId,
            { accountVerification: status },
            { new: true }
        );
        res.status(200).json({ message: "Account verification updated", data: result });
    } catch (err) {
        next(err);
    }
}

exports.verificaionAccountList = async (req, res, next) => {
    try {
        const accountList = await UserAccount.find({})
    } catch (err) {
        next(err)
    }
}