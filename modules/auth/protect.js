const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require(__base + 'models/user.js');
const profileModel = require(__base + 'models/profile.js');

// const oauthModel = require(__base + 'models/oauth.js');

const protect = (req, res, next) => {
	// check header or url parameters or post parameters for token
	let token = req.body.token || req.params.token || req.headers['x-access-token'];
	// decode token
	if (token) {
		// verifies secret and checks exp
		jwt.verify(token, req.app.get('signature'), (err, info) => {
			if (err) {
				res.json({
					success: false,
					msg: err.message
				});
			} else {
				if (info) {
					userModel.findOne({
						"username": info.username
					}, (err, user) => {
						if (err) {
							res.json({
								success: false,
								msg: err.message
							});
						}
						else {
							if (!user) {
								// Check if the username mentioned in the token actually exists.
								return res.json({
									success: false,
									msg: 'Failed to authenticate token.'
								});
							} else {
								// if everything is good, save to request for use in other routes
								profileModel.findOne({ userid: user._id }, (err, doc) => {
									if (err) {
										res.json({
											success: false,
											msg: err.message
										});
									}
									else {
										req.info = info;
										req.info.name = doc.name;
										next();
									}
								});
							}
						}
					});
				} else {
					return res.status(403).json({
						success: false,
						msg: 'User not found.'
					});
				}
			}
		});
	} else {
		// if there is no token then return an error
		return res.status(403).json({
			success: false,
			msg: 'No token provided.'
		});
	}
}

module.exports = protect;