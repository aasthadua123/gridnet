const moment = require('moment');

const postModel = require(__base + 'models/posts');

const errorHandler = (err, res) => {
    res.json({
        "success": false,
        "msg": "There is some error.",
        "error": err.message
    });
}

const poster = (req, res) => {
    let post = new postModel({
        "author": req.info.id,
        "content": req.body.content,
        "timestamp": moment()
    });
    post.save((err, data) => {
        if (err) { errorHandler(err, res); }
        else {
            res.json({
                "success": true,
                "msg": "Post Saved !"
            });
        }
    });
}

module.exports = poster;