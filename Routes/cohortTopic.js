const router = require("express").Router();

const { addValidator } = require("../Validators/cohortTopic");
const { add, getByCourse } = require("../Controllers/cohortTopic");
const { adminAuth } = require("../Middlewares/auth");

router.post("/create", adminAuth, addValidator, add);
router.get("/course/:courseId", getByCourse);

module.exports = router;
