const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAccount"
    },
    city: {
        type: String,
        required: true
    },
    building: {
        type: String,
        required: true,
    },
    aptNo: {
        type: Number,
        required: true
    },
    roadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Road"
    },
    blockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Block"
    }
}, { timestamps: true })

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;