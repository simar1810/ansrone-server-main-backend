const CohortSubject = require("../Models/cohortSubject");

const add = async (req, res) => {
    const { courseId, board, name, exclusive, backgroundColor, color, image } =
        req.body;

    try {
        const cohortSubject = await CohortSubject.create({
            courseId,
            board,
            name,
            exclusive,
            backgroundColor,
            color,
            image,
        });

        return res.json({
            success: true,
            message: "Subject added",
            _id: cohortSubject._id,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const get = async (req, res) => {
    const { courseId } = req.params;

    try {
        const subjects = await CohortSubject.find({ courseId });

        return res.json({
            success: true,
            message: "Subjects fetched successfully",
            subjects,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

module.exports = {
    add,
    get,
};
