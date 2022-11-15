const { verify } = require("jsonwebtoken");
const User = require("../Models/user");
const Admin = require("../Models/admin");

const userAuth = async (req, res, next) => {
    const token =
        req.cookies[process.env.JWT_KEY] || req.body[process.env.JWT_KEY];

    if (token) {
        try {
            const decoded = verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);

            if (user) {
                req.body["user"] = user;
                next();
            } else {
                return res.json({
                    success: false,
                    error: "Invalid token",
                });
            }
        } catch (error) {
            return res.json({
                success: false,
                error: "Invalid token",
            });
        }
    } else {
        return res.json({
            success: false,
            error: "Not authorized",
        });
    }
};

const adminAuth = async (req, res, next) => {
    const token =
        req.cookies[process.env.JWT_KEY] || req.body[process.env.JWT_KEY];

    if (token) {
        try {
            const decoded = verify(token, process.env.JWT_SECRET);
            const admin = await Admin.findById(decoded.id);

            if (admin) {
                req.body["admin"] = admin;
                next();
            } else {
                return res.json({
                    success: false,
                    error: "Invalid token",
                });
            }
        } catch (error) {
            return res.json({
                success: false,
                error: "Invalid token",
            });
        }
    } else {
        return res.json({
            success: false,
            error: "Not authorized",
        });
    }
};

module.exports = {
    userAuth,
    adminAuth,
};
