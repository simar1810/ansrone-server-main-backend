const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lastWatchedSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.ObjectId,
            ref: "User",
            required: true,
        },
        videoId: {
            type: Schema.ObjectId,
            ref: "Video",
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Last Watched", lastWatchedSchema);
