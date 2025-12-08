const mongoose = require('mongoose')
const UserService = require('./userService.model');

exports.createRequest = async (req, res, next) => {
    const { serviceId, issuesId, media, feedback, scheduleService, immediateAssistance } = req.body;
    try {
        const fileNames = req.files ? req.files.map(file => file.filename) : [];
        if (!mongoose.Types.ObjectId.isValid(serviceId)) {
            return res.status(400).json({ message: "Invalid serviceId" });
        }
        if (!mongoose.Types.ObjectId.isValid(issuesId)) {
            return res.status(400).json({ message: "Invalid issuesId" });
        }

        const requestCreate = await UserService.create({
            userId: req.user.id,
            serviceId,
            issuesId,
            media: fileNames,
            feedback,
            scheduleService: scheduleService ? new Date(scheduleService) : null,
            immediateAssistance: !!immediateAssistance,
        })
        res.status(201).json({
            message: "Service created successfully",
            data: requestCreate
        })
    } catch (err) {
        next(err)
    }
}

exports.userServiceList = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if (!userId) {
            return res.status(404).json({
                message: "user id needed"
            })
        }
        const userServicesList = await UserService.find({ userId: userId })
            .populate('serviceId', "name")
            .populate('issuesId', "issue");
        res.status(200).json({
            data: userServicesList
        })
    } catch (err) {
        next(err)
    }
}