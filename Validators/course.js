const addValidator = (req, res, next) => {
    const { type, name, tagline, tagline2, targetClass } = req.body;

    if (type !== "personal" && type !== "cohort") {
        return res.json({
            success: false,
            error: "Course type is required",
        });
    }

    if (!name) {
        return res.json({
            success: false,
            error: "Name is required",
        });
    }

    if (!tagline) {
        return res.json({
            success: false,
            error: "Tagline is required",
        });
    }

    if (!tagline2) {
        return res.json({
            success: false,
            error: "Tagline-2 is required",
        });
    }

    if (!targetClass) {
        return res.json({
            success: false,
            error: "Target class is required",
        });
    }

    next();
};

module.exports = {
    addValidator,
};
