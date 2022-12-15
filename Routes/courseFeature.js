const router = require("express").Router();

const { addValidator } = require("../Validators/courseFeature");
const { add } = require("../Controllers/courseFeature");
const { adminAuth } = require("../Middlewares/auth");

router.post("/create", adminAuth, addValidator, add);

module.exports = router;
