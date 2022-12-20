const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortFAQSchema = new mongoose.Schema({
    courseId: {
        type: Schema.ObjectId,
        ref: "Cohort",
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Cohort FAQ", cohortFAQSchema);
