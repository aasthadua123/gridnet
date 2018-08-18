const router = require('express').Router();

const protect = require(__base + 'modules/auth/protect.js');

router.get('/fetch', protect, require('./fetchNews'));

module.exports = router;
