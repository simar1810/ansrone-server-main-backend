const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
    word: {
        type: String
    },
    sClass: {
        type: Number,
        // required: true,
        // enum: ["6", "7", "8", "9"],
    },
    classDetails: {
        type: String
    },
    subject: {
        type: String,
    },
    subjectDetails: {
        type: String,
    },
    testimonials: {
        type: String,
    }
})

module.exports = mongoose.model("HomeDetail", homeSchema);
