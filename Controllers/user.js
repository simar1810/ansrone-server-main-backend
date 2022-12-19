const User = require("../Models/user");
const Register = require("../Models/register");
const argon2 = require("argon2");
const jwtGenerator = require("../Utils/jwtGenerator");
const otpGenerator = require("../Utils/otpGenerator");
const otpMailer = require("../Utils/otpMailer");

const signup = async (req, res) => {
    const { registerationId, otp } = req.body;

    const user = await Register.findById(registerationId);

    try {
        if (!user) {
            return res.json({
                success: false,
                error: "User entry not found",
            });
        } else {
            if (user.otp == otp) {
                const sUser = await User.create({
                    name: user.name,
                    mobile: user.mobile,
                    courseType: user.courseType,
                    sClass: user.sClass,
                });

                await Register.deleteOne({ _id: registerationId });

                const token = jwtGenerator.generate(sUser._id);

                res.cookie(process.env.JWT_KEY, token, {
                    maxAge: process.env.JWT_DURATION * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });

                return res.json({
                    success: true,
                    message: "Account created",
                    user: {
                        _id: sUser._id,
                        name: sUser.name,
                        mobile: sUser.mobile,
                        sClass: sUser.sClass,
                        courseType: sUser.courseType,
                    },
                    token,
                });
            } else {
                return res.json({
                    success: false,
                    error: "Wrong OTP",
                });
            }
        }
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const loginInit = async (req, res) => {
    const { mobile } = req.body;

    try {
        const user = await User.findOne({ mobile });

        if (user) {
            const otp = otpGenerator.generate();

            await user.updateOne({ otp });

            return res.json({
                success: true,
                message: "OTP sent successfully",
            });
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

const login = async (req, res) => {
    const { mobile, otp } = req.body;

    try {
        const user = await User.findOne({ mobile });

        if (user) {
            if (user.otp == otp) {
                const token = jwtGenerator.generate(user._id);

                res.cookie(process.env.JWT_KEY, token, {
                    maxAge: process.env.JWT_DURATION * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });

                return res.json({
                    success: true,
                    message: "Login successful",
                    user: {
                        _id: user._id,
                        name: user.name,
                        mobile: user.mobile,
                        sClass: user.sClass,
                        courseType: user.courseType,
                    },
                    token,
                });
            } else {
                return res.json({
                    success: false,
                    error: "Invalid OTP",
                });
            }
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

const logout = async (req, res) => {
    res.cookie(process.env.JWT_KEY, "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    return res.json({
        success: true,
        message: "Logout successful",
    });
};

const resetPasswordInit = async (req, res) => {
    const { gEmail, gMobile } = req.body;

    try {
        const user = await User.findOne({ $or: [{ gMobile }, { gEmail }] });

        if (user) {
            const otp = otpGenerator.generate();
            const otpExpire = new Date(new Date().getTime() + 30 * 60 * 1000);

            // TODO: add gmail id and app password to .env file

            // if (await otpMailer.send(user.gEmail, otp)) {
            await user.updateOne({ otp, otpExpire });

            return res.json({
                success: true,
                message: "OTP sent",
            });
            // } else {
            //     return res.json({
            //         success: false,
            //         error: "OTP not sent",
            //     });
            // }
        } else {
            return res.json({
                success: false,
                error: "User not found",
            });
        }
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const resetPassword = async (req, res) => {
    const { gEmail, gMobile, otp, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ gMobile }, { gEmail }] });

        if (user) {
            if (user.otp == otp) {
                if (user.otpExpire >= new Date()) {
                    const hashedPassword = await argon2.hash(password);

                    await user.updateOne({
                        password: hashedPassword,
                        otpExpire: new Date(new Date().getTime() - 1000),
                    });

                    return res.json({
                        success: true,
                        message: "Password changed",
                    });
                } else {
                    return res.json({
                        success: false,
                        error: "OTP expired",
                    });
                }
            } else {
                return res.json({
                    success: false,
                    error: "Invalid OTP",
                });
            }
        } else {
            return res.json({
                success: false,
                error: "User not found",
            });
        }
    } catch (error) {
        return res.json({ success: false, error });
    }
};

module.exports = {
    signup,
    login,
    loginInit,
    logout,
    resetPasswordInit,
    resetPassword,
};
