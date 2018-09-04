var express = require('express');
var router = express.Router();
var cors = require('cors');

import ctrlDevices from '../controllers/devices';
import ctrlData from '../controllers/printouts';
//import xlsCreate from '../controllers/excelCreate';
import pdfCreate from '../controllers/pdfCreate';
import pdfCreate2 from '../controllers/pdfCreate2';
import pdfCreate3 from '../controllers/pdfCreate3';

router.get('/devices', ctrlDevices.deviceList);
router.post('/devices', ctrlDevices.deviceCreate);
//router.get('/devices/:deviceid', ctrlDevices.deviceReadOne);
router.delete('/devices/:deviceid', cors(), ctrlDevices.deviceDeleteOne);
router.put('/devices/:deviceid', cors(), ctrlDevices.deviceToReport);

router.get('/data/:deviceid', ctrlData.dataDevice);
router.get('/datadate/:deviceid', ctrlData.dataDate);
router.get('/datagraph/:deviceid', ctrlData.dataGraph);
router.post('/data', ctrlData.dataCreate);

router.get('/devcol/:deviceid', ctrlDevices.deviceOne);
router.get('/buildcol/:buildid', ctrlDevices.buildOne);
router.get('/unitcol/:unitid', ctrlDevices.unitOne);
router.get('/vendorcol/:vendorid', ctrlDevices.vendorOne);

router.get('/xls', pdfCreate.pdfCreate);
router.get('/pdf1', pdfCreate.pdfCreate);
router.post('/pdf2', pdfCreate2.pdfCreate2);
router.get('/pdf3', pdfCreate3.pdfCreate3);

module.exports = router;