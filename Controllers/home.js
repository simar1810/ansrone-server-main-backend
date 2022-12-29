const Home = require("../Models/home")
const User = require("../Models/user");

const wordPost = async (req, res) => {
    const { word } = req.body;

    try {
        const word = await Home.create({ word });

        return res.json({
            success: true,
            message: "Word added successfully",
            body: word,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const wordGet = async (req, res) => {
    const { wordId } = req.params;

    try {
        const word = await Home.find({ wordId });

        return res.json({
            success: true,
            message: "Word fetched successfully: ",
            body: word,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const classPost = async (req, res) => {
    const { sClass, classDetails } = req.body;

    try {
        const word = await Home.create({ sClass, classDetails });

        return res.json({
            success: true,
            message: "Details added successfully",
            body: word,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const classGet = async (req, res) => {
    const { sClass } = req.params;

    try {
        const sClass = await Home.find({ sClass });

        return res.json({
            success: true,
            message: "Word fetched successfully: ",
            body: sClass,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const subPost = async (req, res) => {
    const { subject, subjDetails } = req.body;

    try {
        const word = await Home.create({ subject, subjectDetails });

        return res.json({
            success: true,
            message: "Subject Details added successfully",
            body: word,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const subGet = async (req, res) => {
    const { subject } = req.params;

    try {
        const subject = await Home.find({ subject });

        return res.json({
            success: true,
            message: "Subject Details fetched successfully: ",
            body: sClass,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};



const testimonials = async (req, res, next) => {
    const { id, name, content, precentage, sClass } = req.body;

    try {
        const user = await User.findOne({ id });

        if (user) {
            const testimonial = await Home.create({
                id, name, content, precentage, sClass
            });

            return res.json({
                success: true,
                message: "Testimonial added",
                body: testimonial
            });
        } else {
            return res.json({
                success: false,
                message: "user not found"
            });
        }
    } catch (error) {
        return res.json({ success: false, error });
    }
};

module.exports = {
    wordPost,
    wordGet,
    classPost,
    classGet,
    subPost,
    subGet,
    testimonials
};