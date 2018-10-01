var mongoose = require('mongoose');
var Loc = mongoose.model('printout');
var LocDev = mongoose.model('device');

var sendJSONResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
module.exports.dataCreate = async function (req, res) {
    let docMonth = new Date().getMonth();

    var doc = await findCurrentDoc(req.body.device_name)

    if (doc.length === 0) {

        Loc.create({
            device: req.body.device,
            device_name: req.body.device_name,
            device_serial: req.body.device_serial,
            date: req.body.date,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            printouts: req.body.printouts
        }, function (err, data) {
            if (err) {
                sendJSONResponse(res, 440, err);
            } else {
                sendJSONResponse(res, 201, 'device');
            }
        });
    }else{
        Loc.findOneAndUpdate(
            {device_name: req.body.device_name, month: new Date().getMonth() + 1, year: new Date().getFullYear()},
            {$set: {printouts: req.body.printouts, date: req.body.date, device_name: req.body.device_name, device_serial: req.body.device_serial}},
            function (err, data) {
                if (err) {
                    sendJSONResponse(res, 440, err);
                } else {
                    sendJSONResponse(res, 201, 'device');
                }
            })
    }

};

module.exports.dataDevice = function (req, res) {
    Loc
        .find({ device_name: req.params.deviceid, month: new Date().getMonth() + 1, year: new Date().getFullYear() }).count()
        .exec(function (err, device) {
            if (err) {
                sendJSONResponse(res, 440, err);
            } else {
                sendJSONResponse(res, 200, device);
            }
        });
};

module.exports.dataDate = function (req, res) {
    Loc
        .find({ device_name: req.params.deviceid, month: new Date().getMonth() + 1, year: new Date().getFullYear() }, { date: 1, _id: 0 })
        .exec(function (err, device) {
            if (err) {
                sendJSONResponse(res, 440, err);
            } else {
                if (device.length > 0)    
                    {sendJSONResponse(res, 200, device[0].date);}
                else{sendJSONResponse(res, 200, '');}
            }
        });
};

module.exports.curPrintouts = function (req, res) {
    Loc
        .find({ device_name: req.params.deviceid, month: new Date().getMonth() + 1, year: new Date().getFullYear() }, { printouts: 1, _id: 0 })
        .exec(function (err, device) {
            if (err) {
                sendJSONResponse(res, 200, 0);
            } else {
                if (device.length > 0)    
                    {sendJSONResponse(res, 200, device[0].printouts);}
                else{sendJSONResponse(res, 200, 0);}
            }
        });
};

module.exports.dataGraph = function (req, res) {

    var prouts = [0];

    Loc
        .find({ device_name: req.params.deviceid, year: new Date().getFullYear() }, { printouts: 1, month: 1, _id: 0 }).sort({ date: 1 }).limit(12)
        .exec(async function (err, device) {
            if (err) {
                sendJSONResponse(res, 440, err);
            } else {

                var months = device.map(item => item.month);
                var maxMonth = Math.max.apply(null, months);
                var firstMonth = Math.min.apply(null, months);

                var arr01 = device.map(item => item.printouts);
                var k = maxMonth - arr01.length;

                var bal = await balanceLoad(req.params.deviceid);
                var bal1 = bal.map(item => item.balance);

                for (var j = 0; j < k; j++) {
                    var t = arr01.unshift(0);
                };

                for (var i = 1; i <= maxMonth; i++) {
                    if (i === firstMonth - 1 && firstMonth > 0) {
                        var val = arr01[i] - bal1[0];
                    } else {
                        var val = arr01[i] - arr01[i - 1];
                    }
                    prouts.push(val);
                }
                sendJSONResponse(res, 200, prouts);
            }
        });
};

function balanceLoad(req) {
    return new Promise(resolve => {
        LocDev.find({ name: req }, { balance: 1, _id: 0 }, function (err, balance) {
            if (err) {
                console.log(err);
            } else {
                resolve(balance);
            }
        })
    })
}

function findCurrentDoc(devid) {
    return new Promise(resolve => {
        Loc
            .find({
                device_name: devid,
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1
            }, function (err, document) {
                if (err) {
                    console.log(err);
                } else {
                    resolve(document);
                }
            })
    })
}