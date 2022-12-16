const DemoClass = require("../Models/demoClass");

const add = async (req, res) => {
    const { courseId, sClass, price, offer } = req.body;

    try {
        const demoClass = await DemoClass.findOne({
            courseId,
            sClass,
        });

        if (demoClass) {
            return res.json({
                success: false,
                message: "Demo class already exists",
            });
        } else {
            const demoClass = await DemoClass.create({
                courseId,
                sClass,
                price,
                offer,
            });

            return res.json({
                success: true,
                message: "Demo class added",
                _id: demoClass._id,
            });
        }
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const get = async (req, res) => {
    const { courseId } = req.params;

    try {
        const demoClasses = await DemoClass.find({ courseId });

        return res.json({
            success: true,
            message: "Demo classes fetched successfully",
            demoClasses,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

module.exports = {
    add,
    get,
};
