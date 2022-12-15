const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const liveClassSchema = new mongoose.Schema({
    courseId: {
        type: Schema.ObjectId,
        ref: "Course",
        required: true,
    },
    sClass: {
        type: Number,
        required: true,
    },
    packageName: {
        type: String,
        required: true,
    },
    totalClasses: {
        type: Number,
        required: true,
    },
    courseDuration: {
        type: String,
        required: true,
    },
    classCount: {
        type: Number,
        required: true,
    },
    timeSpan: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    offer: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Live Class", liveClassSchema);
