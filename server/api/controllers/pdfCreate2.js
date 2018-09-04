var mongoose = require('mongoose');
var Loc = mongoose.model('device');
var LocPrint = mongoose.model('printout');

var moment = require('moment');
require('moment/locale/ru');
moment.locale('ru');

module.exports.pdfCreate2 = async function (req, res) {

    var curMonth = new Date(req.body.repdate).getMonth() + 1;
    var curYear = new Date(req.body.repdate).getFullYear();
    var lastDay = moment(req.body.repdate).endOf('month').toISOString();

    //var curMonth = req.body.month;
    //var curYear = req.body.year;

    var prints = [];
    var maxPrints = 0;
    var page = 1;

    if (curMonth === 1){
        var prevMonth = 12;
        var prevYear = req.body.year - 1;
    }else{
        var prevMonth = curMonth -1;
        var prevYear = req.body.year;
    }

    const PDFDocument = require('pdfkit');
    var devices = await getDev(lastDay);

    let filename = 'topdevices-' + new Date().toLocaleDateString() + '.pdf'

    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
    res.setHeader('Content-type', 'application/pdf')

    const doc = new PDFDocument;

    doc.registerFont('Header Font', 'fonts/ucmi.ttf')
    doc.registerFont('Device Font', 'fonts/12108.ttf')
    doc.registerFont('SubHeader Font', 'fonts/11909.otf')

    doc
        .font('Header Font').fontSize(25)
        .text("Сравнительный отчет: устройства", 140, 30)
        .text("по  количеству отпечатков за месяц", 130, 60)
        .fontSize(12)
        .text("На дату: " + moment().format("DD MM YYYY"), 80, 110)
        .text("Страница: " + page, 480, 110)
        .moveTo(70, 100).lineTo(550, 100).lineWidth(3).stroke()
        .moveTo(49, 150).lineTo(49, 750).lineWidth(1).stroke()
        .moveTo(44, 745).lineTo(550, 745).lineWidth(1).stroke()

    var results = devices.map(async (device) => {

        var curData = await getPrintouts(device.device, curMonth, curYear);
        var prevData = await getPrintouts(device.device, prevMonth, prevYear);

        var dev1 = JSON.parse(JSON.stringify(device));

        if (prevData.length === 0) {
            dev1.printouts = curData[0] - dev1.balance;
        }else{
            dev1.printouts = curData[0] - prevData[0];
        }
        return dev1;
    });

    await Promise.all(results).then(dev => {

        dev.map(dev => {

            prints.push(dev.printouts);
         });
        maxPrints = Math.max(...prints);
    });

    await Promise.all(results).then(dev => {

        var yPos = 710;
        dev.map(dev => {

            if (yPos < 300){
                page = page +1;
                doc
                    .addPage()
                    .font('Header Font').fontSize(25)
                    .text("Сравнительный отчет: устройства", 140, 30)
                    .text("по  количеству отпечатков за месяц", 130, 60)
                    .fontSize(12)
                    .text("На дату: " + moment().format("DD MM YYYY"), 80, 110)
                    .text("Страница: " + page, 480, 110)
                    .moveTo(70, 100).lineTo(550, 100).lineWidth(3).stroke()
                    .moveTo(49, 150).lineTo(49, 750).lineWidth(1).stroke()
                    .moveTo(44, 745).lineTo(550, 745).lineWidth(1).stroke()
                yPos = 710
            }

            doc
                .font('Header Font')
                .fillColor("#616161")
                .fontSize(8)
                .text( dev.model + " " + dev.unit + " " + "корпус: " + dev.build + " " + "кабинет: " + dev.office, 55, yPos - 15)
                .rect(50, yPos, dev.printouts * 450 / maxPrints, 5).fillAndStroke("black", "black")
                .fillColor("black")
                .font('Device Font')
                .text(dev.printouts, dev.printouts * 450 / maxPrints + 60, yPos - 2)
            yPos = yPos - 35
         });
    });

    doc.pipe(res);
    doc.end();
}

async function getDev(lastDay) {
    return new Promise(resolve => {
        Loc
            .find({"inreport": true, start_date: { $lte: lastDay}}, function (err, document) {
                if (err) {
                    console.log(err);
                } else {
                    resolve(document);
                }
            })
    })
}

function getPrintouts(devparam, monthparam, yearparam) {

    return new Promise(resolve => {

        LocPrint
            .find({ device: devparam, year: yearparam, month: monthparam }, { printouts: 1, _id: 0 })
            .exec(function (err, device) {
                if (err) {
                    console.log(err)
                } else {
                    var prouts = device.map(item => item.printouts);
                    resolve(prouts);
                }
            });
    })
};