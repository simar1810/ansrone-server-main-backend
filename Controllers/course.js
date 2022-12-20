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

const get = async (req, res) => {
    const { courseId } = req.params;

    try {
        const course = await Course.findById(courseId);

        if (course) {
            return res.json({
                success: true,
                message: "Course fetched successfully",
                course,
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
