const signupValidator = (req, res, next) => {
    const { mobile, email, password } = req.body;

    if (!mobile) {
        return res.json({
            success: false,
            error: "Mobile number is required",
        });
    }

    if (!email) {
        return res.json({
            success: false,
            error: "Email is required",
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
    const { mobile, email, password } = req.body;

    if (!email && !mobile) {
        return res.json({
            success: false,
            error: "Email or mobile number is required",
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
    const { mobile, email } = req.body;

    if (!email && !mobile) {
        return res.json({
            success: false,
            error: "Email or mobile number is required",
        });
    }

    next();
};

const resetPasswordValidator = (req, res, next) => {
    const { email, mobile, otp, password } = req.body;

    if (!email && !mobile) {
        return res.json({
            success: false,
            error: "Email or mobile number is required",
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
