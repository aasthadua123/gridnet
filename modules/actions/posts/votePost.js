const postModel = require(__base + 'models/posts');

const errorHandler = (err, res) => {
    res.json({
        "success": false,
        "msg": "There is some error.",
        "error": err.message
    });
}

exports.likePost = (req, res) => {
    postModel.findOneAndUpdate(
        { _id: req.params.id, "likes.id": { $nin: [req.info.id] } },
        {
            $push: { likes: { id: req.info.id } },
            $pull: { dislikes: { id: req.info.id } }
        },
        (err, doc) => {
            if (err) { errorHandler(err, res); }
            else {
                res.json({
                    success: true,
                    msg: 'Liked !'
                })
            }
        }
    );
}

exports.dislikePost = (req, res) => {
    postModel.findOneAndUpdate(
        { _id: req.params.id, "dislikes.id": { $nin: [req.info.id] } },
        {
            $push: { dislikes: { id: req.info.id } },
            $pull: { likes: { id: req.info.id } }
        },
        (err, doc) => {
            if (err) { errorHandler(err, res); }
            else {
                res.json({
                    success: true,
                    msg: 'Disliked !'
                })
            }
        }
    );
}

exports.unlikePost = (req, res) => {
    postModel.findOneAndUpdate(
        { _id: req.params.id },
        {
            $pull: { likes: { id: req.info.id } },
            $pull: { dislikes: { id: req.info.id } }
        },
        (err, doc) => {
            if (err) { errorHandler(err, res); }
            else {
                res.json({
                    success: true,
                    msg: 'Unreacted !'
                })
            }
        }
    );
}

exports.commentPost = (req, res) => {
    postModel.findOneAndUpdate(
        { _id: req.params.id },
        {
            $push: {
                comments: {
                    "commenter": req.info.id,
                    "content": req.body.content,
                    "name": req.info.name
                }
            }
        },
        (err, doc) => {
            if (err) { errorHandler(err, res); }
            else {
                res.json({
                    success: true,
                    msg: 'Commented !'
                })
            }
        }
    );
}

exports.commentRemove = (req, res) => {
    postModel.findOneAndUpdate(
        { _id: req.params.postid },
        {
            $pull: {
                comments: {
                    _id: req.params.commentid
                }
            }
        },
        (err, doc) => {
            if (err) { errorHandler(err, res); }
            else {
                res.json({
                    success: true,
                    msg: 'Removed Comment !'
                })
            }
        }
    );
}