const router = require("express").Router();

const { addValidator } = require("../Validators/cohortSubject");
const { add, get } = require("../Controllers/cohortSubject");
const { adminAuth } = require("../Middlewares/auth");

router.post("/create", adminAuth, addValidator, add);
router.get("/course/:courseId", get);

module.exports = router;
