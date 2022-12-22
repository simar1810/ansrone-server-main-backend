const router = require("express").Router();

const { addValidator } = require("../Validators/lastWatched");
const { add, get } = require("../Controllers/lastWatched");
const { userAuth } = require("../Middlewares/auth");

router.post("/create", userAuth, addValidator, add);
router.post("/", userAuth, get);

module.exports = router;
