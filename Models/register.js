const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Register", registerSchema);
