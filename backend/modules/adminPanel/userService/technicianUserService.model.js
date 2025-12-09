const mongoose = require('mongoose');

const technicianUserService = new mongoose.Schema({
    technicianId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Technician"
    },
    userServiceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserService"
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
    reason: {
        type: String
    }
})

const TechnicianUserService = mongoose.model("TechnicianUserService", technicianUserService);
module.exports = TechnicianUserService;