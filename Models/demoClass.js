const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const demoClassSchema = new mongoose.Schema({
    courseId: {
        type: Schema.ObjectId,
        ref: "Course",
        required: true,
    },
    sClass: {
        type: Number,
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

module.exports = mongoose.model("Demo Class", demoClassSchema);
