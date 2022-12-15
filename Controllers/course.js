const Course = require("../Models/course");

const add = async (req, res) => {
    const { type, name, tagline, tagline2, targetClass } = req.body;

    try {
        const course = await Course.create({
            type,
            name,
            tagline,
            tagline2,
            targetClass,
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
