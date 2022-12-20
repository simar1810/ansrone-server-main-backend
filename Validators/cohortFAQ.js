const addValidator = (req, res, next) => {
    const { courseId, question, answer } = req.body;

    if (!courseId) {
        return res.json({
            success: false,
            error: "Course ID is required",
        });
    }

    if (!question) {
        return res.json({
            success: false,
            error: "Question is required",
        });
    }

    if (!answer) {
        return res.json({
            success: false,
            error: "Answer is required",
        });
    }

    next();
};

module.exports = {
    addValidator,
};
