const mongoose = require('mongoose');

const familyMemberSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserAccount"
    },
    fullName: {
        type: String
    },
    relation: {
        type: String,
        enum: ["wife", "daughter", "son"]
    },
    mobile: {
        type: Number
    },
    email: {
        type: String
    },
    gender: {
        type: String,
        enum: ["male", "female", "others"]
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
})

const FamilyMemeber = mongoose.model("FamilyMember", familyMemberSchema);
module.exports = FamilyMemeber;