const User = require("../Models/user");
const argon2 = require("argon2");
const jwtGenerator = require("../Utils/jwtGenerator");

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
    } catch (e) {
        return res.json({ success: false, error: e });
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
                _id: user._id,
                token,
            });
        } else {
            return res.json({
                success: false,
                error: "Invalid credentials",
            });
        }
    } catch (error) {
        return res.json({ success: false, error: e });
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

module.exports = {
    signup,
    login,
    logout,
};
