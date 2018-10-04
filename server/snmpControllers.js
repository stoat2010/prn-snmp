var dns = require('dns');

var sendJSONResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.devStatus = async function (req, res) {

    var oids = ['1.3.6.1.2.1.43.10.2.1.4.1.1'];
    var statusDev = await snmpGet(req.params.deviceid, oids);
    sendJSONResponse(res, 200, statusDev.length);
}

module.exports.devData = async function (req, res) {

    var device = await getType(req.params.deviceid)

    if (device[0].vendor === "Xerox"){
        var oids = ['1.3.6.1.2.1.43.10.2.1.4.1.1', '1.3.6.1.4.1.253.8.53.13.2.1.6.1.20.33', '1.3.6.1.4.1.253.8.53.13.2.1.6.1.20.34'];
    }else{
        var oids = ['1.3.6.1.2.1.43.10.2.1.4.1.1', '1.3.6.1.4.1.11.2.3.9.4.2.1.4.1.2.7.0', '1.3.6.1.4.1.11.2.3.9.4.2.1.4.1.2.6.0'];    
    }
    const results = oids.map(async oid => {

        var value = await snmpGet(req.params.deviceid, [oid]);
        return !!value.length ? value[0] : '-';
    })

    await Promise.all(results).then(result => {
        sendJSONResponse(res, 200, result);
    })
}

module.exports.devDataFull = async function (req, res) {

    var device = await getType(req.params.deviceid)

    console.log(device)

    if(device.length > 0){
    if (device[0].vendor === "Xerox"){
        var oids = ['1.3.6.1.2.1.25.3.2.1.3.1','1.3.6.1.2.1.43.8.2.1.14.1.1','1.3.6.1.2.1.43.5.1.1.17.1','1.3.6.1.2.1.43.10.2.1.4.1.1', '1.3.6.1.4.1.253.8.53.13.2.1.6.1.20.33', '1.3.6.1.4.1.253.8.53.13.2.1.6.1.20.34'];
    }else{
        var oids = ['1.3.6.1.2.1.25.3.2.1.3.1','1.3.6.1.2.1.43.8.2.1.14.1.1','1.3.6.1.2.1.43.5.1.1.17.1','1.3.6.1.2.1.43.10.2.1.4.1.1', '1.3.6.1.4.1.11.2.3.9.4.2.1.4.1.2.7.0', '1.3.6.1.4.1.11.2.3.9.4.2.1.4.1.2.6.0'];    
    }}else{
        var oids = ['1.3.6.1.2.1.25.3.2.1.3.1','1.3.6.1.2.1.43.8.2.1.14.1.1','1.3.6.1.2.1.43.5.1.1.17.1','1.3.6.1.2.1.43.10.2.1.4.1.1', '1.3.6.1.4.1.11.2.3.9.4.2.1.4.1.2.7.0', '1.3.6.1.4.1.11.2.3.9.4.2.1.4.1.2.6.0'];    
    }

    const results = oids.map(async oid => {

        var value = await snmpGet(req.params.deviceid, [oid]);
        return !!value.length ? value[0] : '-';
    })

    await Promise.all(results).then(result => {
        sendJSONResponse(res, 200, result);
    })
}


module.exports.getToner = async function (req, res) {

    var snmp = require('net-snmp');
    var values = [];


    var deviceType = await getType(req.params.deviceid);
    var deviceIP = await resolveName(req.params.deviceid)

    if (deviceType[0].type === 0) {
        var oids = ['1.3.6.1.2.1.43.12.1.1.4.1.1','1.3.6.1.2.1.43.11.1.1.6.1.1', '1.3.6.1.2.1.43.11.1.1.8.1.1', '1.3.6.1.2.1.43.11.1.1.9.1.1'];
    } else {
        var oids = ['1.3.6.1.2.1.43.12.1.1.4.1.1','1.3.6.1.2.1.43.11.1.1.6.1.1', '1.3.6.1.2.1.43.11.1.1.8.1.1', '1.3.6.1.2.1.43.11.1.1.9.1.1',
        '1.3.6.1.2.1.43.12.1.1.4.1.2','1.3.6.1.2.1.43.11.1.1.6.1.2', '1.3.6.1.2.1.43.11.1.1.8.1.2', '1.3.6.1.2.1.43.11.1.1.9.1.2',
        '1.3.6.1.2.1.43.12.1.1.4.1.3','1.3.6.1.2.1.43.11.1.1.6.1.3', '1.3.6.1.2.1.43.11.1.1.8.1.3', '1.3.6.1.2.1.43.11.1.1.9.1.3',
        '1.3.6.1.2.1.43.12.1.1.4.1.4','1.3.6.1.2.1.43.11.1.1.6.1.4', '1.3.6.1.2.1.43.11.1.1.8.1.4', '1.3.6.1.2.1.43.11.1.1.9.1.4'];
    }



    var session = snmp.createSession(deviceIP[0], "public");
    session.get(oids, function (error, varbinds) {
        if (error) {
            sendJSONResponse(res, 401, 0);
            session.close();
            return;
        } else {
            for (var i = 0; i < varbinds.length; i=i+4) {
                if (snmp.isVarbindError(varbinds[i])) {
                    console.log(snmp.isVarbindError(varbinds[i]))
                } else {
                    if (varbinds[i+3].value < 0) {
                        varbinds[i+3].value = 0;
                    }
                        var vl = {[varbinds[i].value.toString().replace('\u0000', '')]: [varbinds[i+1].value.toString().replace(',', ''), varbinds[i+2].value, varbinds[i+3].value]};
                        values = values.concat(vl)
                }
            }
            var arrData = values.reduce(function(result,item){
                var key = Object.keys(item)[0];
                result[key] = item[key]
                return result
            });
            sendJSONResponse(res, 200, arrData);
            session.close();
        }
    })


}

module.exports.devName = function (req, res) {

    dns.setServers(['172.25.140.17', '172.25.140.27']);
    dns.resolve4(req.params.deviceid, function (err, names) {

        if (err) {
            sendJSONResponse(res, 404, '-1')
        } else {
            sendJSONResponse(res, 200, names[0]);
        }
    })

}

function resolveName(devid) {
    return new Promise(resolve => {
        dns.setServers(['172.25.140.17', '172.25.140.27', '172.22.123.3', '172.22.123.4']);
        dns.resolve4(devid, function (err, devip) {
            if (err) {
                resolve(-1);
            } else {
                resolve(devip);
            }
        })
    })
}

function getType(devid) {
    var mongoose = require('mongoose');
    var Loc = mongoose.model('device');

    return new Promise(resolve => {
        Loc.find({ name: devid }, { type: 1, device: 1, vendor: 1, _id: 0 }, function (err, type) {
            if (err) {
                console.log(err);
            } else {
                resolve(type);
            }
        })
    })
}

async function snmpGet(devName, oids) {

    var snmp = require('net-snmp');
    const options ={
        port: 161,
        retries: 1,
        timeout: 2000
    }
    var values = [];

    var deviceIP = await resolveName(devName);

    if (deviceIP != -1) {

        return new Promise(resolve => {
            var session = snmp.createSession(deviceIP[0], "public", options);
            session.get(oids, function (error, varbinds) {
                if (error) {
                    session.close();
                    resolve([]);
                } else {
                    for (var i = 0; i < varbinds.length; i++) {
                        if (snmp.isVarbindError(varbinds[i])) {
                            console.log(snmp.isVarbindError(varbinds[i]))
                        } else {
                            values = values.concat(varbinds[i].value)
                        }
                    }
                    var arrData = values.toString('utf8').split(',');
                    session.close();
                    resolve(arrData);
                }
            })
        })
    } else {
        return [];
    }
}