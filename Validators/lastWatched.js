const addValidator = (req, res, next) => {
    const { videoId } = req.body;

    if (!videoId) {
        return res.json({
            success: false,
            error: "Video ID is required",
        });
    }

    next();
};

module.exports = {
    addValidator,
};
