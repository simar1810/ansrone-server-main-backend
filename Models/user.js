const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    courseType: {
        type: String,
        required: true,
    },
    sClass: {
        type: Number,
        required: true,
    },
    otp: {
        type: Number,
    },
});

module.exports = mongoose.model("User", userSchema);
