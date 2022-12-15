const addValidator = (req, res, next) => {
    const { courseId, sClass, price, offer } = req.body;

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
