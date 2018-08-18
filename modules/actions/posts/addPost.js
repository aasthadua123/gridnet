const moment = require('moment');

const postModel = require(__base + 'models/posts');
const profileModel = require(__base + 'models/profile');

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
            let post = new postModel({
                "author": {
                    id: req.info.id,
                    name: profile.name
                },
                "content": req.body.content,
                "status": req.body.status,
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
    });
}

module.exports = poster;