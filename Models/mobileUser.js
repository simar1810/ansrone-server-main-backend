const mongoose = require("mongoose");

const mobileSchema = new mongoose.Schema({
    courseType: {
        type: String,
    },
    name: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    sClass: {
        type: Number,
    },
    otp: {
        type: Number,
    },
    board: {
        type: String
    },
    parentsMobile: {
        type: Number,
    }
});

module.exports = mongoose.model("MobileUser", mobileSchema);