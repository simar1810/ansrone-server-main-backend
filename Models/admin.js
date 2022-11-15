const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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

module.exports = mongoose.model("Admin", adminSchema);
