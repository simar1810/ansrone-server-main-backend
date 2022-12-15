const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseFeatureSchema = new mongoose.Schema({
    courseId: {
        type: Schema.ObjectId,
        ref: "Course",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Course Feature", courseFeatureSchema);
