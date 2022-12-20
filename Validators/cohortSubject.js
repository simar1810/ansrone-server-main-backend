const addValidator = (req, res, next) => {
    const { courseId, name, backgroundColor, color, image } = req.body;

    if (!courseId) {
        return res.json({
            success: false,
            error: "Course ID is required",
        });
    }

    if (!name) {
        return res.json({
            success: false,
            error: "Name is required",
        });
    }

    if (!backgroundColor) {
        return res.json({
            success: false,
            error: "Background color is required",
        });
    }

    if (!color) {
        return res.json({
            success: false,
            error: "Color is required",
        });
    }

    if (!image) {
        return res.json({
            success: false,
            error: "Image is required",
        });
    }
    next();
};

module.exports = {
    addValidator,
};
