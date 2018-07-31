var mongoose = require('mongoose');
var Loc = mongoose.model('printout');

var sendJSONResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};
module.exports.dataCreate = function(req, res) {
    let docMonth = new Date().getMonth();
    //console.log(docMonth);
    Loc.create({
        device: req.body.device,
        date: req.body.date,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        printouts: req.body.printouts
    }, function(err, data){
        if(err){
            sendJSONResponse(res, 440, err);
        }else{
            sendJSONResponse(res, 201, 'device');
        }
    });
    
};

module.exports.dataDevice = function(req, res) {
    Loc
    .find({device: req.params.deviceid, month: new Date().getMonth()+1, year: new Date().getFullYear()}).count()
    .exec(function(err, device){
        if(err){
            sendJSONResponse(res, 440, err);
        }else{
            sendJSONResponse(res, 200, device);}
    });
};

module.exports.dataGraph = function(req, res) {
    var arr02=[0,0,0,0,0,0,0,0,0,0,0,0];
    var prouts = [];
    Loc
    .find({device: req.params.deviceid},{printouts: 1, month: 1,  _id: 0}).sort({date: 1}).limit(12)
    .exec(function(err, device){
        if(err){
            sendJSONResponse(res, 440, err);
        }else{
            var arr01 = device.map(item => item.printouts);
            var months = device.map(item=> item.month);
            var maxMonth = Math.max.apply(null, months);
            var arr03 = arr02.concat(arr01);
            var arr04 = arr03.slice((maxMonth + 1), arr03.length);
            for( var i=1; i<=maxMonth; i++ ){
                var val = arr04[i]-arr04[i-1];
                prouts.push(val);
            }
            sendJSONResponse(res, 200,prouts);
        }
    });
};