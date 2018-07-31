var mongoose = require('mongoose');
var Loc = mongoose.model('device');

var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
module.exports.deviceCreate = function(req, res) {
    Loc.create({
        device: req.body.device,
        build: req.body.build,
        office: req.body.office,
        unit: req.body.unit,
        balance: req.body.balance
    }, function(err, device){
        if(err){
            sendJSONResponse(res, 440, err);
        }else{
            sendJSONResponse(res, 201, device);
        }
    });
    
};

module.exports.deviceList = function(req, res) {
    Loc
    .find()
    .exec(function(err, device){
        sendJSONResponse(res, 200, device);
    });
};

module.exports.deviceOne = function(req, res) {
    Loc
    .find({device: req.params.deviceid})
    .exec(function(err, device){
        sendJSONResponse(res, 200, device);
    });
};

module.exports.deviceDeleteOne = function (req, res) {
    var deviceid = req.params.deviceid;
    if (deviceid) {
        Loc
            .findByIdAndRemove(deviceid)
            .exec(function (err, devicet) {
                if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                }
                sendJSONResponse(res, 204, null);
            }
            );
    } else {
        sendJSONResponse(res, 404, { "message": "No device" });
    }};