const express = require('express');
const router = express.Router();

/* Friend Request Handlers */
router.use('/friend', require(__base + 'modules/actions/friend/routes'));

/* Post Handlers */
router.use('/post', require(__base + 'modules/actions/posts/routes'));

/* Feed Handlers */
router.use('/feed', require(__base + 'modules/actions/feed/routes'));

module.exports = router;
