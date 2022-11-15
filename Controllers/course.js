const Course = require("../Models/course");

const add = async (req, res) => {
    const { name, price, description, sClass } = req.body;

    try {
        const course = await Course.create({
            name,
            price,
            description,
            sClass,
        });

        return res.json({
            success: true,
            message: "Course added",
            _id: course._id,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const getAll = async (req, res) => {
    const { sClass } = req.body;

    try {
        var courses;

        if (sClass) {
            courses = await Course.find({ sClass });
        } else {
            courses = await Course.find({});
        }

        return res.json({
            success: true,
            message: "Courses fetched successfully",
            courses,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

module.exports = {
    add,
    getAll,
};
