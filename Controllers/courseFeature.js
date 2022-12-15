const CourseFeature = require("../Models/courseFeature");

const add = async (req, res) => {
    const { courseId, title, desc } = req.body;

    try {
        const courseFeature = await CourseFeature.create({
            courseId,
            title,
            desc,
        });

        return res.json({
            success: true,
            message: "Feature added",
            _id: courseFeature._id,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

module.exports = {
    add,
};
