const Video = require("../Models/video");
const LastWatched = require("../Models/lastWatched");

const add = async (req, res) => {
    const { videoId } = req.body;
    const { _id } = req.body.user;

    try {
        const lastWatched = await LastWatched.create({
            userId: _id,
            videoId,
        });

        return res.json({
            success: true,
            message: "Last watch added",
            _id: lastWatched._id,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const get = async (req, res) => {
    const { _id } = req.body.user;

    try {
        const videos = await LastWatched.find({ userId: _id })
            .sort({
                createdAt: "descending",
            })
            .limit(5);

        for (let i = 0; i < videos.length; i++) {
            const video = await Video.findById(videos[i].videoId);
            videos[i] = video;
        }

        return res.json({
            success: true,
            message: "Videos fetched successfully",
            videos,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

module.exports = {
    add,
    get,
};
