const profileModel = require(__base + 'models/profile');
const postModel = require(__base + 'models/posts');

const errorHandler = (err, res) => {
    res.json({
        "success": false,
        "msg": "There is some error.",
        "error": err.message
    });
}

const fetcher = (req, res) => {
    profileModel.findOne({ userid: req.params.id }, (err, profile) => {
        if (err) { errorHandler(err, res); }
        else {
            postModel.find({ "author.id": req.params.id }).sort({ timestamp: 'descending' }).exec((err, posts) => {
                if (err) { errorHandler(err, res); }
                else {
                    posts = posts.map((p) => {
                        return {
                            "postid": p._id,
                            "content": p.content,
                            "timestamp": p.timestamp,
                            "likes": p.likes.length,
                            "dislikes": p.dislikes.length,
                            "comments": p.comments.length,
                        }
                    });
                    res.json({
                        success: true,
                        id: profile._id,
                        name: profile.name,
                        friends: profile.friends.length,
                        feed: posts
                    })
                }
            });
        }
    });
}

module.exports = fetcher;