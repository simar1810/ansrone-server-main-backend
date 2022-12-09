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
                const hashedPassword = await argon2.hash(
                    otpGenerator.generate() + ""
                );

                const sUser = await User.create({
                    name: user.name,
                    mobile: user.mobile,
                    courseType: user.courseType,
                    sClass: user.sClass,
                    password: hashedPassword,
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
                    _id: sUser._id,
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

const login = async (req, res) => {
    const { gEmail, gMobile, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ gMobile }, { gEmail }] });

        if (user && (await argon2.verify(user.password, password))) {
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
                    sName: user.sName,
                    gName: user.gName,
                    gMobile: user.gMobile,
                    gEmail: user.gEmail,
                    sClass: user.sClass,
                },
                token,
            });
        } else {
            return res.json({
                success: false,
                error: "Invalid credentials",
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
    logout,
    resetPasswordInit,
    resetPassword,
};
