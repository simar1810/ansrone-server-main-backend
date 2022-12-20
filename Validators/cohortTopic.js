const addValidator = (req, res, next) => {
    const { courseId, subjectId, name } = req.body;

    if (!courseId) {
        return res.json({
            success: false,
            error: "Course ID is required",
        });
    }

    if (!subjectId) {
        return res.json({
            success: false,
            error: "Subject ID is required",
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
