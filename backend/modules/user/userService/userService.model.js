const mongoose = require('mongoose');

const userServiceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAccount"
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
    },
    issuesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
        default: null
    },
    otherIssue: {
        type: String,
        default: null
    },
    serviceRequestID: {
        type: String
    },
    media: {
        type: [String]
    },
    feedback: {
        type: String
    },
    scheduleService: {
        type: Date,
        default: null
    },
    immediateAssistance: {
        type: Boolean,
        default: false
    },
    serviceStatus: {
        type: String,
        enum: [
            "submitted",
            "processing",
            "technicianAssigned",
            "inProgress",
            "completed"
        ],
        default: "submitted"
    },
    statusTimestamps: {
        submitted: { type: Date, default: null },
        processing: { type: Date, default: null },
        technicianAssigned: { type: Date, default: null },
        inProgress: { type: Date, default: null },
        completed: { type: Date, default: null }
    },
}, { timestamps: true });

userServiceSchema.pre('save', async function () {
    if (!this.serviceRequestID) {
        const count = await mongoose.model('UserService').countDocuments() + 1;
        this.serviceRequestID = `SRM ${count.toString().padStart(3, '0')}`;
    }
});

const UserService = mongoose.model("UserService", userServiceSchema);
module.exports = UserService;