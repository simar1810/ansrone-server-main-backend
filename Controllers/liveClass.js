const LiveClass = require("../Models/liveClass");

const add = async (req, res) => {
    const {
        courseId,
        sClass,
        packageName,
        totalClasses,
        courseDuration,
        classCount,
        timeSpan,
        price,
        offer,
    } = req.body;

    try {
        const liveClass = await LiveClass.create({
            courseId,
            sClass,
            packageName,
            totalClasses,
            courseDuration,
            classCount,
            timeSpan,
            price,
            offer,
        });

        return res.json({
            success: true,
            message: "Live class added",
            _id: liveClass._id,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

module.exports = {
    add,
};
