const Register = require("../Models/register");
const User = require("../Models/mobileUser");
const otpGenerator = require("../Utils/otpGenerator");
const argon2 = require("argon2");
const jwtGenerator = require("../Utils/jwtGenerator");


const step1 = async (req, res) => {
    const { mobile } = req.body;
    const courseType = "cohort";
    var bool = false;

    try {
        const user = await User.findOne({ mobile });
        const registered = await Register.findOne({ mobile })

        if (user) {
            const otp = otpGenerator.generate();

            await user.updateOne({ otp });
            await user.updateOne({ courseType });
            bool = true;

            return res.json({
                body: user,
                success: true,
                message: "OTP sent successfully to User DB." + "bool = " + bool,
                bool: bool

            });
        } else if (registered) {
            const otp = otpGenerator.generate();

            await registered.updateOne({ otp });
            await registered.updateOne({ courseType });
            bool = true;

            return res.json({
                body: registered,
                success: true,
                message: "OTP sent successfully to Register DB" + "bool = " + bool,
                bool: bool
            });
        } else {
            try {
                const otp = otpGenerator.generate();

                const user = await Register.create({
                    mobile,
                    courseType: "cohort",
                    otp: otp
                });

                return res.json({
                    body: user,
                    success: true,
                    message: "User entry added successfully to Register DB" + "bool = " + bool,
                    bool: bool,
                    _id: user._id
                });
            } catch (error) {
                return res.json({ success: false, error });
            }
        };
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const step2 = async (req, res) => {
    const { mobile, otp, registerationId } = req.body;

    try {
        const user = await User.findOne({ mobile });
        const registered = await Register.findOne({ mobile });

        if (user) {
            // bool ==> true
            // otp match
            // return body

            if (user.otp == otp) {
                const token = jwtGenerator.generate(user._id);

                res.cookie(process.env.JWT_KEY, token, {
                    maxAge: process.env.JWT_DURATION * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });

                return res.json({
                    body: user,
                    success: true,
                    message: "Login successful",
                    user: {
                        _id: user._id,
                        mobile: user.mobile,
                        courseType: "cohort",
                    },
                    token,
                });
            } else {
                return res.json({
                    success: false,
                    error: "Invalid OTP",
                });
            }
        } else
            if (registered) {
                // const { registerationId, otp } = req.body;
                // const userR = await Register.findById(id);

                // bool ==> false

                if (registered.otp == otp) {
                    const sUser = await User.create({
                        otp: registered.otp,
                        mobile: registered.mobile,
                        courseType: "cohort",
                        // name: name,
                        // sClass: sClass
                    });

                    await Register.deleteOne({ _id: registerationId });

                    // const token = jwtGenerator.generate(sUser._id);

                    // res.cookie(process.env.JWT_KEY, token, {
                    //     maxAge: process.env.JWT_DURATION * 24 * 60 * 60 * 1000,
                    //     httpOnly: true,
                    //     secure: true,
                    //     sameSite: "none",
                    // });

                    return res.json({
                        success: true,
                        message: "Account created",
                        body: user,
                        // token,
                    });
                } else {
                    return res.json({
                        success: false,
                        error: "Wrong OTP",
                    });
                };
            } else {
                return res.json({
                    success: false,
                    error: "Mobile number is not registered",
                });
            }
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const step3 = async (req, res) => {
    const { name, sClass, board, registerationId, parentsMobile, parentsName } = req.body;


    try {
        const user = await User.findOne({ registerationId });

        if (user) {
            const token = jwtGenerator.generate(user._id);

            await User.updateOne({ _id: registerationId }, { $set: { name, sClass, board, parentsMobile, parentsName } })

            return res.json({
                success: true,
                message: "Login successful",
                body: user,
                token,
            });
        }
        else {
            return res.json({
                body: user,
                success: false,
                error: "Mobile number is not registered",
            });
        }

    } catch (error) {
        return res.json({ success: false, error });
    }
}
module.exports = {
    step1,
    step2,
    step3
};
