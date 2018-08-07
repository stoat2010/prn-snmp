var dns = require('dns');

var sendJSONResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.devStatus = function (req, res) {
    var snmp = require('net-snmp');

    //var oids = ['1.3.6.1.2.1.43.5.1.1.16.1', '1.3.6.1.2.1.43.8.2.1.14.1.1', '1.3.6.1.2.1.43.10.2.1.4.1.1'];
    var oids = ['1.3.6.1.2.1.43.5.1.1.16.1'];
    //console.log('here');
    var session = snmp.createSession(req.params.deviceid, "public");

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

module.exports.devData = function (req, res) {
    var snmp = require('net-snmp');
    var values = [];

    var oids = ['1.3.6.1.2.1.43.5.1.1.16.1', '1.3.6.1.2.1.43.8.2.1.14.1.1', '1.3.6.1.2.1.43.5.1.1.17.1', '1.3.6.1.2.1.43.10.2.1.4.1.1'];

    var session = snmp.createSession(req.params.deviceid, "public");

    session.get(oids, function (error, varbinds) {
        if (error) {
            sendJSONResponse(res, 200, 1);
            session.close();
            return;
        } else {
            for (var i = 0;  i < varbinds.length; i++){
                if(snmp.isVarbindError(varbinds[i])){
                    //console.log(snmp.isVarbindError(varbinds[i]))
                }else{
                    values = values.concat(varbinds[i].value)
                }
            }
            var arrData = values.toString('utf8').split(',');

        sendJSONResponse(res, 200, arrData);
        session.close();
        }
    })
}

module.exports.devName = function (req, res) {

    dns.setServers([ '172.25.140.17', '172.25.140.27']);
    dns.reverse(req.params.deviceid, function(err, names){
        
        if(err){
            console.log(err)}

        sendJSONResponse(res, 200, names[0]);
    })

}
