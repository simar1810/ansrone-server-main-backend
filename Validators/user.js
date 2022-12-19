const signupValidator = (req, res, next) => {
    const { registerationId, otp } = req.body;

    if (!registerationId) {
        return res.json({
            success: false,
            error: "Registeration ID is required",
        });
    }

    if (!otp) {
        return res.json({
            success: false,
            error: "OTP is required",
        });
    }

    next();
};

const loginInitValidator = (req, res, next) => {
    const { mobile } = req.body;

    if (!mobile) {
        return res.json({
            success: false,
            error: "Mobile number is required",
        });
    }

    next();
};

const loginValidator = (req, res, next) => {
    const { mobile, otp } = req.body;

    if (!mobile) {
        return res.json({
            success: false,
            error: "Mobile number is required",
        });
    }

    if (!otp) {
        return res.json({
            success: false,
            error: "OTP is required",
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
    loginInitValidator,
    resetPasswordInitValidator,
    resetPasswordValidator,
};
