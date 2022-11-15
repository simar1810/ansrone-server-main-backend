const router = require("express").Router();

const {
    signupValidator,
    loginValidator,
    resetPasswordInitValidator,
    resetPasswordValidator,
} = require("../Validators/user");
const {
    signup,
    login,
    logout,
    resetPasswordInit,
    resetPassword,
} = require("../Controllers/user");
const { userAuth } = require("../Middlewares/auth");

router.post("/signup/local", signupValidator, signup);
router.post("/login/local", loginValidator, login);
router.post("/logout/local", userAuth, logout);
router.post(
    "/reset/password/init",
    resetPasswordInitValidator,
    resetPasswordInit
);
router.post("/reset/password", resetPasswordValidator, resetPassword);

module.exports = router;
