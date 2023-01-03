const router = require("express").Router();
const {postblogs , getblogs} = require('../Controllers/blogs')

router.post("/postblogs", postblogs);
router.get("/getblogs",  getblogs);

module.exports = router;
