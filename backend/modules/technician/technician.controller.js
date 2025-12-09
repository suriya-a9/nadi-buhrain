const Technician = require('../adminPanel/technician/technician.model');
const UserService = require('../user/userService/userService.model');
const Address = require('../address/address.model');
const TechnicianUserService = require('../adminPanel/userService/technicianUserService.model');

exports.assignedServices = async (req, res, next) => {
    try {
        const technicianId = req.user.id;
        if (!technicianId) {
            return res.status(400).json({ message: "Technician ID required" });
        }

        const assignments = await TechnicianUserService.find({
            technicianId,
            status: 'pending'
        });
        if (!assignments.length) {
            return res.status(200).json({
                message: "no assigned request yet",
                data: []
            });
        }
        const userServiceIds = assignments.map(a => a.userServiceId);

        const services = await UserService.find({ _id: { $in: userServiceIds } })
            .populate({
                path: 'userId',
                select: 'basicInfo'
            })
            .populate('serviceId')
            .populate('issuesId');

        const userIds = services.map(s => s.userId._id);
        const addresses = await Address.find({ userId: { $in: userIds } });

        const servicesWithAddress = services.map(service => {
            const address = addresses.find(a => a.userId.toString() === service.userId._id.toString());
            const assignment = assignments.find(a => a.userServiceId.toString() === service._id.toString());
            return {
                ...service.toObject(),
                address: address || null,
                assignmentStatus: assignment?.status,
                assignmentReason: assignment?.reason || null
            };
        });

        res.status(200).json({
            data: servicesWithAddress
        });
    } catch (err) {
        next(err);
    }
}

exports.servicesList = async (req, res, next) => {
    try {
        const technicianId = req.user.id;
        if (!technicianId) {
            return res.status(400).json({ message: "Technician ID required" });
        }

        const assignments = await TechnicianUserService.find({
            technicianId,
            status: 'accepted'
        });

        const userServiceIds = assignments.map(a => a.userServiceId);

        const services = await UserService.find({ _id: { $in: userServiceIds } })
            .populate({
                path: 'userId',
                select: 'basicInfo'
            })
            .populate('serviceId')
            .populate('issuesId');

        const userIds = services.map(s => s.userId._id);
        const addresses = await Address.find({ userId: { $in: userIds } });

        const servicesWithAddress = services.map(service => {
            const address = addresses.find(a => a.userId.toString() === service.userId._id.toString());
            const assignment = assignments.find(a => a.userServiceId.toString() === service._id.toString());
            return {
                ...service.toObject(),
                address: address || null,
                assignmentStatus: assignment?.status,
                assignmentReason: assignment?.reason || null
            };
        });

        res.status(200).json({
            data: servicesWithAddress
        });
    } catch (err) {
        next(err);
    }
}