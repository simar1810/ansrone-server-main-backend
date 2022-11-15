const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    sName: {
        type: String,
        required: true,
    },
    gName: {
        type: String,
        required: true,
    },
    gMobile: {
        type: Number,
        required: true,
        unique: true,
    },
    gEmail: {
        type: String,
        required: true,
        unique: true,
    },
    sClass: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
    },
    otpExpire: {
        type: Date,
    },
});

module.exports = mongoose.model("User", userSchema);
