const router = require("express").Router();

const { addValidator } = require("../Validators/courseSyllabus");
const { add } = require("../Controllers/courseSyllabus");
const { adminAuth } = require("../Middlewares/auth");

router.post("/create", adminAuth, addValidator, add);

module.exports = router;
