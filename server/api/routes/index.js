var express = require('express');
var router = express.Router();
var cors = require('cors');

import ctrlDevices from '../controllers/devices';
import ctrlData from '../controllers/printouts';
import xlsCreate from '../controllers/excelCreate';

router.get('/devices', ctrlDevices.deviceList);
router.post('/devices', ctrlDevices.deviceCreate);
//router.get('/devices/:deviceid', ctrlDevices.deviceReadOne);
router.delete('/devices/:deviceid', cors(), ctrlDevices.deviceDeleteOne);

router.get('/data/:deviceid', ctrlData.dataDevice);
router.get('/datadate/:deviceid', ctrlData.dataDate);
router.get('/datagraph/:deviceid', ctrlData.dataGraph);
router.post('/data', ctrlData.dataCreate);

router.get('/devcol/:deviceid', ctrlDevices.deviceOne);
router.get('/buildcol/:buildid', ctrlDevices.buildOne);
router.get('/unitcol/:unitid', ctrlDevices.unitOne);
router.get('/vendorcol/:vendorid', ctrlDevices.vendorOne);

router.get('/xls', xlsCreate.xlsCreate);

module.exports = router;