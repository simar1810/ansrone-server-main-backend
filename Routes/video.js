const router = require("express").Router();

const { addValidator } = require("../Validators/video");
const { add, getExclusive, getNonExclusive } = require("../Controllers/videos");
const { adminAuth, userAuth } = require("../Middlewares/auth");

router.post("/create", adminAuth, addValidator, add);
router.post("/course/exclusive", userAuth, getExclusive);
router.post("/course/non-exclusive", userAuth, getNonExclusive);

module.exports = router;
