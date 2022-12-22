const Video = require("../Models/video");
const CohortSubject = require("../Models/cohortSubject");
const Cohort = require("../Models/cohort");

const add = async (req, res) => {
    const { url, subjectId, topicId, name } = req.body;

    try {
        const video = await Video.create({
            url,
            topicId,
            subjectId,
            name,
        });

        return res.json({
            success: true,
            message: "Video added",
            _id: video._id,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const getExclusive = async (req, res) => {
    const { sClass } = req.body.user;

    try {
        const course = await Cohort.findOne({ sClass });

        const exclusiveSubject = await CohortSubject.find({
            exclusive: true,
            courseId: course._id,
        });

        const exclusiveSubjectIds = exclusiveSubject.map(
            (subject) => subject._id
        );

        const videos = await Video.find({
            subjectId: { $in: exclusiveSubjectIds },
        });

        return res.json({
            success: true,
            message: "Videos fetched successfully",
            videos,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const getNonExclusive = async (req, res) => {
    const { sClass } = req.body.user;

    try {
        const course = await Cohort.findOne({ sClass });

        const nonExclusiveSubject = await CohortSubject.find({
            exclusive: false,
            courseId: course._id,
        });

        const nonExclusiveSubjectIds = nonExclusiveSubject.map(
            (subject) => subject._id
        );

        const videos = await Video.find({
            subjectId: { $in: nonExclusiveSubjectIds },
        });

        return res.json({
            success: true,
            message: "Videos fetched successfully",
            videos,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

module.exports = {
    add,
    getExclusive,
    getNonExclusive,
};
