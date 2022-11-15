const addValidator = (req, res, next) => {
    const { name, price, sClass } = req.body;

    if (!name) {
        return res.json({
            success: false,
            error: "Name is required",
        });
    }

    if (!price) {
        return res.json({
            success: false,
            error: "Price is required",
        });
    }

    if (!sClass) {
        return res.json({
            success: false,
            error: "Student class is required",
        });
    }

    next();
};

module.exports = {
    addValidator,
};
