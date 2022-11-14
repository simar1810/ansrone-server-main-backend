const router = require("express").Router();

const { signupValidator, loginValidator } = require("../Validators/user");
const { signup, login, logout } = require("../Controllers/user");
const { auth } = require("../Middlewares/auth");

router.post("/signup/local", signupValidator, signup);
router.post("/login/local", loginValidator, login);
router.post("/logout/local", auth, logout);

module.exports = router;
