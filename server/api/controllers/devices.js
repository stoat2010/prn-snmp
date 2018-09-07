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
        balance: req.body.balance,
        model: req.body.model,
        serial: req.body.serial,
        vendor: req.body.vendor,
        start_date: req.body.start_date,
        monthlimit: req.body.monthlimit,
        name: req.body.name,
        type: req.body.type
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

module.exports.buildOne = function(req, res) {
    Loc
    .find({build: req.params.buildid})
    .exec(function(err, device){
        sendJSONResponse(res, 200, device);
    });
};

module.exports.unitOne = function(req, res) {
    Loc
    .find({unit: req.params.unitid})
    .exec(function(err, device){
        sendJSONResponse(res, 200, device);
    });
};

module.exports.vendorOne = function(req, res) {
    Loc
    .find({vendor: req.params.vendorid})
    .exec(function(err, device){
        sendJSONResponse(res, 200, device);
    });
};

module.exports.deviceDeleteOne = function (req, res) {
    var deviceid = req.params.deviceid;
    if (deviceid) {
        Loc
            .findByIdAndRemove(deviceid)
            .exec(function (err, device) {
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

module.exports.deviceToReport = function (req, res) {
    var deviceid = req.params.deviceid;
    var state = req.body.state;
    if (deviceid){
        Loc
            .updateOne({device: deviceid}, { $set: {"inreport": state}})
            .exec(function(err, result){
                if (err) {
                    sendJSONResponse(res, 404, err);
                    return;
                }
                sendJSONResponse(res, 201, 0);
                })
            }
}