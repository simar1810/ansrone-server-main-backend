const router = require("express").Router();

const {
    createValidator,
    addDetailsValidator,
} = require("../Validators/register");
const { create, addDetails, resendOtp } = require("../Controllers/register");

router.post("/create", createValidator, create);
router.post("/add", addDetailsValidator, addDetails);
router.post("/otp/resend", resendOtp);

module.exports = router;
