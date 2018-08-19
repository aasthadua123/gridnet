const moment = require('moment');

const requestModel = require(__base + 'models/request');
const profileModel = require(__base + 'models/profile');

const errorHandler = (err, res) => {
    res.json({
        "success": false,
        "msg": "There is some error.",
        "error": err.message
    });
}

const fetchRequests = (req, res) => {
    requestModel.find({ "recipient": req.info.id, status: 0 }, (err, requests) => {
        if (err) { errorHandler(err, res); }
        else {
            let requesters = requests.map((r) => r.requester);
            profileModel.find({userid: {$in: requesters}}, (err, profiles) => {
                if (err) { errorHandler(err, res); }
                else {
                    profiles = profiles.map((p) => ({
                        name: p.name,
                        id: p.userid
                    }))
                    res.json({
                        success: true,
                        requests: profiles
                    });    
                }  
            });
        }
    });
}

module.exports = fetchRequests;
