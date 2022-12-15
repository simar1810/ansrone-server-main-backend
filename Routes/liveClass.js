const router = require("express").Router();

const { addValidator } = require("../Validators/liveClass");
const { add } = require("../Controllers/liveClass");
const { adminAuth } = require("../Middlewares/auth");

router.post("/create", adminAuth, addValidator, add);

module.exports = router;
