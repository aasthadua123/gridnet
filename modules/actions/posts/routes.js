const router = require('express').Router();

const protect = require(__base + 'modules/auth/protect.js');

router.post('/addPost', protect, require('./addPost'));

module.exports = router;
