const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const config = require(__base + 'system/config')

router.post('/register', require(__base + '/modules/auth/register.js'));
router.post('/login', require(__base + '/modules/auth/login.js'));

/* Verification Routes */

router.post('/verify/:type/:username', require(__base + 'modules/auth/verify.js'));
router.get('/verify/:type/:username/:code', require(__base + 'modules/auth/verify.js'));

/* ----------------------- Restricted Routes ----------------------*/

/* Authority Protect */
const protect = require(__base + 'modules/auth/protect.js');

/* Protected Routes */

router.get('/status', protect, (req, res) => {
	res.json({ "message": 'You are logged in.', "data":req.info });
})

router.patch('/change-password', protect, require(__base + 'modules/auth/change.js'));

// router.get('/logout', auth, require(__base + 'modules/auth/logout.js'))

module.exports = router
