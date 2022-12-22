const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new mongoose.Schema({
    topicId: {
        type: Schema.ObjectId,
        ref: "Cohort Topic",
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
    url: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Video", videoSchema);
