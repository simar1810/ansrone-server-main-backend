const router = require('express').Router();
const { step1, step2, step3 } = require('../Controllers/mobileAuth')

router.post('/step1', step1)
router.post('/step2', step2)
router.post('/step3', step3)

module.exports = router;