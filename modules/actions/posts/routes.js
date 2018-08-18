const router = require('express').Router();

const protect = require(__base + 'modules/auth/protect.js');

router.post('/add', protect, require('./addPost'));

router.get('/like', protect, require('./votePost').likePost);
router.get('/dislike', protect, require('./votePost').dislikePost);
router.post('/add-comment', protect, require('./votePost').commentPost);

module.exports = router;
