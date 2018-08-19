const router = require('express').Router();

const protect = require(__base + 'modules/auth/protect.js');

router.post('/add', protect, require('./addPost'));

router.get('/like/:id', protect, require('./votePost').likePost);
router.get('/unlike/:id', protect, require('./votePost').unlikePost);
router.get('/dislike/:id', protect, require('./votePost').dislikePost);

router.post('/add-comment/:id', protect, require('./votePost').commentPost);
router.get('/remove-comment/:postid/:commentid', protect, require('./votePost').commentRemove);

module.exports = router;
