var dns = require('dns');

var sendJSONResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.devStatus = async function (req, res) {
    var snmp = require('net-snmp');

    //var oids = ['1.3.6.1.2.1.43.5.1.1.16.1', '1.3.6.1.2.1.43.8.2.1.14.1.1', '1.3.6.1.2.1.43.10.2.1.4.1.1'];
    var oids = ['1.3.6.1.2.1.43.5.1.1.16.1'];

    var deviceIP = await resolveName(req.params.deviceid)

    var session = snmp.createSession(deviceIP[0], "public");

    session.get(oids, function (error, varbinds) {
        if (error) {
            sendJSONResponse(res, 200, 1);
            session.close();
            return;
        }
        sendJSONResponse(res, 200, 0);
        session.close();
    })
}

module.exports.devData = async function (req, res) {
    var snmp = require('net-snmp');
    var values = [];

    var oids = ['1.3.6.1.2.1.43.5.1.1.16.1', '1.3.6.1.2.1.43.8.2.1.14.1.1', '1.3.6.1.2.1.43.5.1.1.17.1', '1.3.6.1.2.1.43.10.2.1.4.1.1'];

    var deviceIP = await resolveName(req.params.deviceid)

    if (deviceIP != -1) {

        var session = snmp.createSession(deviceIP[0], "public");

        session.get(oids, function (error, varbinds) {
            if (error) {
                sendJSONResponse(res, 200, 1);
                session.close();
                return;
            } else {
                for (var i = 0; i < varbinds.length; i++) {
                    if (snmp.isVarbindError(varbinds[i])) {
                        //console.log(snmp.isVarbindError(varbinds[i]))
                    } else {
                        values = values.concat(varbinds[i].value)
                    }
                }
                var arrData = values.toString('utf8').split(',');

                sendJSONResponse(res, 200, arrData);
                session.close();
            }
        })
    }else{
        sendJSONResponse(res, 404, {});
    }
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
        dns.setServers(['172.25.140.17', '172.25.140.27']);
        dns.resolve4(devid, function (err, devip) {
            if (err) {
                resolve(-1);
            } else {
                resolve(devip);
            }
        })
    })
}
