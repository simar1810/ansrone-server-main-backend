const Admin = require("../Models/admin");
const argon2 = require("argon2");
const jwtGenerator = require("../Utils/jwtGenerator");
const otpGenerator = require("../Utils/otpGenerator");
const otpMailer = require("../Utils/otpMailer");

const signup = async (req, res) => {
    const { mobile, email, password } = req.body;

    try {
        const admin = await Admin.findOne({ $or: [{ mobile }, { email }] });

        if (admin) {
            if (admin.mobile == mobile) {
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

            const admin = await Admin.create({
                email,
                mobile,
                password: hashedPassword,
            });

            const token = jwtGenerator.generate(admin._id);

            res.cookie(process.env.JWT_KEY, token, {
                maxAge: process.env.JWT_DURATION * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            return res.json({
                success: true,
                message: "Account created",
                _id: admin._id,
                token,
            });
        }
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const login = async (req, res) => {
    const { mobile, email, password } = req.body;

    try {
        const admin = await Admin.findOne({ $or: [{ mobile }, { email }] });

        if (admin && (await argon2.verify(admin.password, password))) {
            const token = jwtGenerator.generate(admin._id);

            res.cookie(process.env.JWT_KEY, token, {
                maxAge: process.env.JWT_DURATION * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            return res.json({
                success: true,
                message: "Login successful",
                _id: admin._id,
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
    const { email, mobile } = req.body;

    try {
        const admin = await Admin.findOne({ $or: [{ mobile }, { email }] });

        if (admin) {
            const otp = otpGenerator.generate();
            const otpExpire = new Date(new Date().getTime() + 30 * 60 * 1000);

            // TODO: add gmail id and app password to .env file

            // if (await otpMailer.send(admin.email, otp)) {
            await admin.updateOne({ otp, otpExpire });

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
                error: "Admin not found",
            });
        }
    } catch (error) {
        return res.json({ success: false, error });
    }
};

const resetPassword = async (req, res) => {
    const { email, mobile, otp, password } = req.body;

    try {
        const admin = await Admin.findOne({ $or: [{ mobile }, { email }] });

        if (admin) {
            if (admin.otp == otp) {
                if (admin.otpExpire >= new Date()) {
                    const hashedPassword = await argon2.hash(password);

                    await admin.updateOne({
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
                error: "Admin not found",
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
