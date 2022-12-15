const router = require("express").Router();

const { addValidator } = require("../Validators/demoClass");
const { add } = require("../Controllers/demoClass");
const { adminAuth } = require("../Middlewares/auth");

router.post("/create", adminAuth, addValidator, add);

module.exports = router;
