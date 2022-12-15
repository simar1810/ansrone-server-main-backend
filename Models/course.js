const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["personal", "cohort"],
    },
    name: {
        type: String,
        required: true,
    },
    tagline: {
        type: String,
        required: true,
    },
    tagline2: {
        type: String,
        required: true,
    },
    targetClass: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Course", courseSchema);
