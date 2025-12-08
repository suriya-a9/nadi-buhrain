const UserService = require('../../user/userService/userService.model');
const formatDate = require('../../../utils/formatDate');

exports.newUserServiceRequest = async (req, res, next) => {
    try {
        const newServiceList = await UserService.find({ serviceStatus: "submitted" })
            .populate('serviceId')
            .populate('issuesId');
        const formattedList = newServiceList.map(service => {
            const formattedTimestamps = {};
            Object.entries(service.statusTimestamps).forEach(([key, value]) => {
                formattedTimestamps[key] = formatDate(value, true);
            });
            return {
                ...service.toObject(),
                statusTimestamps: formattedTimestamps,
                scheduleService: formatDate(service.scheduleService, true),
                createdAt: formatDate(service.createdAt, true),
                updatedAt: formatDate(service.updatedAt, true)
            };
        });
        res.status(200).json({
            data: formattedList
        })
    } catch (err) {
        next(err);
    }
}

exports.updateServiceStatus = async (req, res, next) => {
    const { id, serviceStatus } = req.body;
    try {
        const validStatuses = [
            "submitted",
            "processing",
            "technicianAssigned",
            "inProgress",
            "completed"
        ];
        if (!validStatuses.includes(serviceStatus)) {
            return res.status(400).json({ message: "Invalid status" });
        }

        const update = {
            serviceStatus,
            [`statusTimestamps.${serviceStatus}`]: new Date()
        };

        const updated = await UserService.findByIdAndUpdate(
            id,
            { $set: update },
            { new: true }
        );
        res.status(200).json({
            message: "Status updated",
            data: updated
        });
    } catch (err) {
        next(err);
    }
};