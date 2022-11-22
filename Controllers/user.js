const User = require("../Models/user");
const argon2 = require("argon2");
const jwtGenerator = require("../Utils/jwtGenerator");
const otpGenerator = require("../Utils/otpGenerator");
const otpMailer = require("../Utils/otpMailer");

const signup = async (req, res) => {
    const { sName, gName, gMobile, gEmail, sClass, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ gMobile }, { gEmail }] });

        if (user) {
            if (user.gMobile == gMobile) {
                return res.json({
                    success: false,
                    error: "Mobile number already in use",
                });
            } else {
                return res.json({
                    success: false,
                    error: "Email address already in use",
                });
            }
        } else {
            const hashedPassword = await argon2.hash(password);

            const user = await User.create({
                sName,
                gName,
                gMobile,
                gEmail,
                sClass,
                password: hashedPassword,
            });

            const token = jwtGenerator.generate(user._id);

            res.cookie(process.env.JWT_KEY, token, {
                maxAge: process.env.JWT_DURATION * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            return res.json({
                success: true,
                message: "Account created",
                _id: user._id,
                token,
            });
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
