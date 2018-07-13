const router = require('express').Router();

const protect = require(__base + 'modules/auth/protect.js');

router.post('/add', require(__base + '/modules/actions/friend/add'));
router.post('/manage', require(__base + '/modules/actions/friend/add'));
router.post('/remove', require(__base + '/modules/actions/friend/add'));

module.exports = router;
