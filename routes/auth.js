const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')
const config = require(__base + 'system/config.js')

router.post('/register', require(__base + '/modules/auth/register.js'));

// router.post('/login', require(__base + '/modules/auth/login.js'))

/* Verification Routes */

// router.post('/verify/phone/:username', require(__base + 'modules/auth/verifyPhone.js'))

// router.get('/verify/email/:username/:code', require(__base + 'modules/auth/verifyEmail.js'))

/* ----------------------- Restricted Routes ----------------------*/

/*--|Authority Protect|--*/
// const auth = require(__base + 'modules/auth/protect.js');

/*--|Authority payloadProtected Routes|--*/

// router.get('/status', auth, (req, res) => {
// 	res.json({ "message": 'You are logged in.', "data":req.decoded });
// })

// router.post('/change-password', auth, require(__base + 'modules/auth/passChange.js'))

// router.get('/logout', auth, require(__base + 'modules/auth/logout.js'))

module.exports = router
