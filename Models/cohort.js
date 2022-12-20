const mongoose = require("mongoose");

const cohortSchema = new mongoose.Schema({
    sClass: {
        type: Number,
        required: true,
    },
    duration: {
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

module.exports = mongoose.model("Cohort", cohortSchema);
