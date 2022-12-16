const router = require("express").Router();

const { addValidator } = require("../Validators/liveClass");
const { add, get } = require("../Controllers/liveClass");
const { adminAuth } = require("../Middlewares/auth");

router.post("/create", adminAuth, addValidator, add);
router.get("/course/:courseId", get);

module.exports = router;
