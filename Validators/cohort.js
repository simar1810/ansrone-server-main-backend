const addValidator = (req, res, next) => {
    const { sClass, duration, price, offer } = req.body;

    if (!sClass) {
        return res.json({
            success: false,
            error: "Student class is required",
        });
    }

    if (!duration) {
        return res.json({
            success: false,
            error: "Duration is required",
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
