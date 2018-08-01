var express = require('express');
var router = express.Router();
var cors = require('cors');

import ctrlDevices from '../controllers/devices';
import ctrlData from '../controllers/printouts';

router.get('/devices', ctrlDevices.deviceList);
router.post('/devices', ctrlDevices.deviceCreate);
//router.get('/devices/:deviceid', ctrlDevices.deviceReadOne);
router.delete('/devices/:deviceid', cors(), ctrlDevices.deviceDeleteOne);

router.get('/data/:deviceid', ctrlData.dataDevice);
router.get('/datagraph/:deviceid', ctrlData.dataGraph);
router.post('/data', ctrlData.dataCreate);

router.get('/devcol/:deviceid', ctrlDevices.deviceOne);
router.get('/buildcol/:buildid', ctrlDevices.buildOne);

module.exports = router;