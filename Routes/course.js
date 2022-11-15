const router = require("express").Router();

const { addValidator } = require("../Validators/course");
const { add, getAll } = require("../Controllers/course");
const { adminAuth } = require("../Middlewares/auth");

router.post("/create", adminAuth, addValidator, add);
router.post("/all", getAll);

module.exports = router;
