const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
    },
    sClass: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Course", courseSchema);
