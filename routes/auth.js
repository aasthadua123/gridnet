const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router()

router.post('/register', require(__base + '/modules/auth/register.js'));
router.post('/login', require(__base + '/modules/auth/login.js'));
router.post('/forgot', require(__base + '/modules/auth/forgot.js'));
router.patch('/reset/:id', require(__base + '/modules/auth/reset.js'));

/* Verification Routes */
router.post('/verify/:type/:username', require(__base + 'modules/auth/verify.js'));
router.get('/verify/:type/:username/:code', require(__base + 'modules/auth/verify.js'));

/* Authority Protect */
const protect = require(__base + 'modules/auth/protect.js');

/* Protected Routes */

router.get('/status', protect, (req, res) => {
	res.json({ "message": 'You are logged in.', "data":req.info });
})

router.patch('/change-password', protect, require(__base + 'modules/auth/change.js'));
router.get('/logout', protect, require(__base + 'modules/auth/logout.js'))

module.exports = router
