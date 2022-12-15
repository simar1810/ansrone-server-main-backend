const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSyllabusSchema = new mongoose.Schema({
    courseId: {
        type: Schema.ObjectId,
        ref: "Course",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    sClass: {
        type: Number,
        required: true,
    },
    board: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Course Syllabus", courseSyllabusSchema);
