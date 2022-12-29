const router = require('express').Router();
const { wordPost,
    wordGet,
    classPost,
    classGet,
    subPost,
    subGet,
    testimonials } = require('../Controllers/home')

router.post('/classPost', classPost)
router.post('/wordPost', wordPost)
router.post('/subPost', subPost)
router.post('/testimonials', testimonials)

router.get('/classGet', classGet)
router.get('/wordGet', wordGet)
router.get('/subGet', subGet)

module.exports = router;