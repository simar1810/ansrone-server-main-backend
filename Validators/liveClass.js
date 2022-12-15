const addValidator = (req, res, next) => {
    const {
        courseId,
        sClass,
        packageName,
        totalClasses,
        courseDuration,
        classCount,
        timeSpan,
        price,
        offer,
    } = req.body;

    if (!courseId) {
        return res.json({
            success: false,
            error: "Course ID is required",
        });
    }

    if (!sClass) {
        return res.json({
            success: false,
            error: "Student class is required",
        });
    }

    if (!packageName) {
        return res.json({
            success: false,
            error: "Price package name is required",
        });
    }

    if (!totalClasses) {
        return res.json({
            success: false,
            error: "Total classes is required",
        });
    }

    if (!courseDuration) {
        return res.json({
            success: false,
            error: "Total course duration is required",
        });
    }

    if (!classCount) {
        return res.json({
            success: false,
            error: "Class count in time span is required",
        });
    }

    if (!timeSpan) {
        return res.json({
            success: false,
            error: "Time span is required",
        });
    }

    if (!price) {
        return res.json({
            success: false,
            error: "Price is required",
        });
    }

    if (!offer) {
        return res.json({
            success: false,
            error: "Offer is required",
        });
    }

    next();
};

module.exports = {
    addValidator,
};
