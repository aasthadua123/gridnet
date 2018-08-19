const profileModel = require(__base + 'models/profile');
const postModel = require(__base + 'models/posts');

const errorHandler = (err, res) => {
    res.json({
        "success": false,
        "msg": "There is some error.",
        "error": err.message
    });
}

const poster = (req, res) => {
    profileModel.findOne({ userid: req.info.id }, (err, profile) => {
        if (err) { errorHandler(err, res); }
        else {
            let friends = profile.friends.map((f) => f.id);
            friends.push(profile.userid);
            postModel.find({ "author.id": { $in: friends } }).sort({ timestamp: 'descending' }).exec((err, posts) => {
                if (err) { errorHandler(err, res); }
                else {
                    posts = posts.map((p) => {
                        return {
                            "postid": p._id,
                            "author": p.author.name,
                            "owner": p.author.id,
                            "content": p.content,
                            "timestamp": p.timestamp,
                            "likes": p.likes,
                            "dislikes": p.dislikes,
                            "comments": p.comments,
                        }
                    });
                    res.json({
                        success: true,
                        feed: posts
                    })
                }
            });
        }
    });
}

module.exports = poster;