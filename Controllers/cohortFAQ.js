const CohortFAQ = require("../Models/cohortFAQ");

const add = async (req, res) => {
    const { courseId, question, answer } = req.body;

    try {
        const cohortFAQ = await CohortFAQ.create({
            courseId,
            question,
            answer,
        });

        return res.json({
            success: true,
            message: "FAQ added",
            _id: cohortFAQ._id,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const get = async (req, res) => {
    const { courseId } = req.params;

    try {
        const faqs = await CohortFAQ.find({ courseId });

        return res.json({
            success: true,
            message: "FAQs fetched successfully",
            faqs,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

module.exports = {
    add,
    get,
};
