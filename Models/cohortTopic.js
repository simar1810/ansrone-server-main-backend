const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cohortTopicSchema = new mongoose.Schema({
    courseId: {
        type: Schema.ObjectId,
        ref: "Cohort",
        required: true,
    },
    subjectId: {
        type: Schema.ObjectId,
        ref: "Cohort Subject",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Cohort Topic", cohortTopicSchema);
