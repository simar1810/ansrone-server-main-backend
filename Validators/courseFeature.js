const addValidator = (req, res, next) => {
    const { courseId, title, desc } = req.body;

    if (!courseId) {
        return res.json({
            success: false,
            error: "Course ID is required",
        });
    }

    if (!title) {
        return res.json({
            success: false,
            error: "Title is required",
        });
    }

    if (!desc) {
        return res.json({
            success: false,
            error: "Description is required",
        });
    }

    next();
};

module.exports = {
    addValidator,
};
