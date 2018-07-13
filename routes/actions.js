const express = require('express');
const router = express.Router();

/* Friend Request Handlers */
router.use('/friend', require(__base + 'modules/actions/friend/routes'));

/* Person Handlers */
// router.use('/person', require(__base + 'modules/action/person/routes'));

/* Post Handlers */
// router.use('/post', require(__base + 'modules/action/post/routes'));

module.exports = router;
