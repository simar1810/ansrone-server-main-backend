const router = require("express").Router();

const {
    signupValidator,
    loginValidator,
    resetPasswordInitValidator,
    resetPasswordValidator,
} = require("../Validators/admin");
const {
    signup,
    login,
    logout,
    resetPasswordInit,
    resetPassword,
} = require("../Controllers/admin");
const { adminAuth } = require("../Middlewares/auth");

router.post("/signup/local", signupValidator, signup);
router.post("/login/local", loginValidator, login);
router.post("/logout/local", adminAuth, logout);
router.post(
    "/reset/password/init",
    resetPasswordInitValidator,
    resetPasswordInit
);
router.post("/reset/password", resetPasswordValidator, resetPassword);

module.exports = router;
