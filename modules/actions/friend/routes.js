const router = require('express').Router();

const protect = require(__base + 'modules/auth/protect.js');

router.get('/add/:id', protect, require('./add'));
router.get('/manage/:type/:id', protect, require('./manage'));
router.get('/fetch', protect, require('./fetch'));

module.exports = router;
