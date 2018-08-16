var mongoose = require('mongoose');
var Loc = mongoose.model('device');

module.exports.xlsCreate = async function (req, res) {

    var devices = await getDev();

    //var builds = [...new Set(devices.map(item => item.build))];

    var Excel = require('exceljs');

    res.writeHead(200, {
        'Content-Disposition': 'attachment; filename="file.xlsx"',
        'Transfer-Encoding': 'chunked',
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    var workbook = new Excel.stream.xlsx.WorkbookWriter({ stream: res })
    var worksheet = workbook.addWorksheet('report', {
        pageSetup:{paperSize: 9, orientation: 'landscape'}
    })

    worksheet.columns = [
        { key: "ip", width: 35, alignment:{horizontal: "center"}},
        { key: "assets", width: 10},
        {key: "assets", width: 40},
        {key: "blank", width: 10},
        { key: "assets", width: 10}
    ];

    worksheet.addRow(["IP/FQDN","Описание","","","График"])

    worksheet.mergeCells('B1','C1');
    worksheet.mergeCells('E1','P1');
    worksheet.addRow().height=4;
    devices.map(device =>
        {
            worksheet.addRow([device.device, "цех/отдел: ", device.unit]);
            worksheet.addRow([device.name, "Корпус: ", device.build]);
            worksheet.addRow(['', "Кабинет: ", device.office]);
            worksheet.addRow().height=4;

        })

    worksheet.eachRow(row=>{row.eachCell({includeEmpty: true}, cell=>{cell.font={bold: true}})})

    worksheet.commit();

}

function getDev() {
    return new Promise(resolve => {
        Loc
            .find({}, function (err, document) {
                if (err) {
                    console.log(err);
                } else {
                    resolve(document);
                }
            })
    })
}

function getDevBuild(build) {
    return new Promise(resolve => {
        Loc
            .find({build: build}, function (err, document) {
                if (err) {
                    console.log(err);
                } else {
                    resolve(document);
                }
            })
    })
}