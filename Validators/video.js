const addValidator = (req, res, next) => {
    const { url, subjectId, topicId, name } = req.body;

    if (!url) {
        return res.json({
            success: false,
            error: "URL is required",
        });
    }

    if (!subjectId) {
        return res.json({
            success: false,
            error: "SubjectId is required",
        });
    }

    if (!topicId) {
        return res.json({
            success: false,
            error: "TopicId is required",
        });
    }

    if (!name) {
        return res.json({
            success: false,
            error: "Name is required",
        });
    }

    next();
};

module.exports = {
    addValidator,
};
