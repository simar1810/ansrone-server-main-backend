const CourseSyllabus = require("../Models/courseSyllabus");

const add = async (req, res) => {
    const { courseId, title, sClass, board } = req.body;

    try {
        const courseSyllabus = await CourseSyllabus.create({
            courseId,
            title,
            sClass,
            board,
        });

        return res.json({
            success: true,
            message: "Topic added",
            _id: courseSyllabus._id,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};
const get = async (req, res) => {
    const { courseId } = req.params;

    try {
        const syllabus = await CourseSyllabus.find({ courseId });

        return res.json({
            success: true,
            message: "Syllabus fetched successfully",
            syllabus,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

module.exports = {
    add,
    get,
};
