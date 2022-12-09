const Register = require("../Models/register");
const User = require("../Models/user");
const otpGenerator = require("../Utils/otpGenerator");

const create = async (req, res) => {
    const { courseType } = req.body;

    try {
        const user = await Register.create({
            courseType,
        });

        return res.json({
            success: true,
            message: "User entry added successfully",
            _id: user._id,
        });
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const addDetails = async (req, res) => {
    const { id, name, mobile, sClass } = req.body;

    try {
        const sUser = await User.findOne({ mobile });
        if (!sUser) {
            const user = await Register.findById(id);

            if (user) {
                const otp = otpGenerator.generate();

                await user.updateOne({ name, mobile, sClass, otp });

                // TODO: Send otp to user

                return res.json({
                    success: true,
                    message: "OTP sent successfully",
                });
            } else {
                return res.json({
                    success: false,
                    error: "Cannot find entry",
                });
            }
        } else {
            return res.json({
                success: false,
                error: "Mobile number already exists",
            });
        }
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const resendOtp = async (req, res) => {
    const { id } = req.body;

    try {
        const user = await Register.findById(id);

        if (user) {
            const otp = otpGenerator.generate();

            await user.updateOne({ otp });

            // TODO: Send otp to user

            return res.json({
                success: true,
                message: "OTP resent successfully",
            });
        } else {
            return res.json({
                success: false,
                error: "Cannot find entry",
            });
        }
    } catch (error) {
        return res.json({ success: false, error });
    }
};

module.exports = {
    create,
    addDetails,
    resendOtp,
};
