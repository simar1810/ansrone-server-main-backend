const Cohort = require("../Models/cohort");

const add = async (req, res) => {
    const { sClass, duration, price, offer } = req.body;

    try {
        const cohort = await Cohort.findOne({ sClass });

        if (cohort) {
            return res.json({
                success: false,
                message: "Course already exists",
            });
        } else {
            const cohort = await Cohort.create({
                sClass,
                duration,
                price,
                offer,
            });

            return res.json({
                success: true,
                message: "Course added",
                _id: cohort._id,
            });
        }
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const get = async (req, res) => {
    const { sClass } = req.params;

    try {
        const cohort = await Cohort.findOne({ sClass });

        if (cohort) {
            return res.json({
                success: true,
                message: "Course fetched successfully",
                course: cohort,
            });
        } else {
            return res.json({
                success: false,
                error: "Course not found",
            });
        }
    } catch (error) {
        return res.json({ success: false, error });
    }
};

module.exports = {
    add,
    get,
};
