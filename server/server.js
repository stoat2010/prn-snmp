import http from 'http';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

require("./api/models/db");
import devStatus from "./snmpControllers";
var routesApi = require('./api/routes/index');


const app = express();
app.server = http.createServer(app);

app.use(cors());
app.use(bodyParser.json({extended: false}));

app.get('/', (req, res)=> res.send('SNMP опрос сетевых МФУ и принтеров'));

app.get('/devstatus/:deviceid', devStatus.devStatus);
app.get('/devdata/:deviceid', devStatus.devData);
app.get('/devname/:deviceid', devStatus.devName);
app.get('/devtoner/:deviceid', devStatus.getToner);

app.use('/api', routesApi);

app.server.listen(process.env.PORT || 3333);
console.log('Started on port: ' + app.server.address().port);
export default app;