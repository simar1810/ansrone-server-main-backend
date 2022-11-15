const signupValidator = (req, res, next) => {
    const { sName, gName, gMobile, gEmail, sClass, password } = req.body;

    if (!sName) {
        return res.json({
            success: false,
            error: "Student name is required",
        });
    }

    if (!gName) {
        return res.json({
            success: false,
            error: "Guardian name is required",
        });
    }

    if (!gMobile) {
        return res.json({
            success: false,
            error: "Guardian mobile number is required",
        });
    }

    if (!gEmail) {
        return res.json({
            success: false,
            error: "Guardian email is required",
        });
    }

    if (!sClass) {
        return res.json({
            success: false,
            error: "Class is required",
        });
    }

    if (!password) {
        return res.json({
            success: false,
            error: "Password is required",
        });
    }

    next();
};

const loginValidator = (req, res, next) => {
    const { gEmail, gMobile, password } = req.body;

    if (!gEmail && !gMobile) {
        return res.json({
            success: false,
            error: "Guardian email or mobile number is required",
        });
    }

    if (!password) {
        return res.json({
            success: false,
            error: "Password is required",
        });
    }

    next();
};

const resetPasswordInitValidator = (req, res, next) => {
    const { gEmail, gMobile } = req.body;

    if (!gEmail && !gMobile) {
        return res.json({
            success: false,
            error: "Guardian email or mobile number is required",
        });
    }

    next();
};

const resetPasswordValidator = (req, res, next) => {
    const { gEmail, gMobile, otp, password } = req.body;

    if (!gEmail && !gMobile) {
        return res.json({
            success: false,
            error: "Guardian email or mobile number is required",
        });
    }

    if (!otp) {
        return res.json({
            success: false,
            error: "OTP is required",
        });
    }

    if (!password) {
        return res.json({
            success: false,
            error: "Password is required",
        });
    }

    next();
};

module.exports = {
    signupValidator,
    loginValidator,
    resetPasswordInitValidator,
    resetPasswordValidator,
};
