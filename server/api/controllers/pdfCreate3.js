var mongoose = require('mongoose');
var Loc = mongoose.model('device');
var LocPrint = mongoose.model('printout');

var moment = require('moment');
require('moment/locale/ru');
moment.locale('ru');

module.exports.pdfCreate3 = async function (req, res) {

    var curMonth = new Date(req.body.repdate).getMonth() + 1;
    var curYear = new Date(req.body.repdate).getFullYear();
    var lastDay = moment(req.body.repdate).endOf('month').toISOString();

    var page = 1;

    if (curMonth === 1){
        var prevMonth = 12;
        var prevYear = new Date().getFullYear() - 1;
    }else{
        var prevMonth = curMonth -1;
        var prevYear = new Date().getFullYear();
    }

    const PDFDocument = require('pdfkit');
    var devices = await getDev(lastDay);

    let filename = 'deviceslimit-' + new Date().toLocaleDateString() + '.pdf'

    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
    res.setHeader('Content-type', 'application/pdf')

    const doc = new PDFDocument;

    doc.registerFont('Header Font', 'fonts/ucmi.ttf')
    doc.registerFont('Device Font', 'fonts/12108.ttf')
    doc.registerFont('SubHeader Font', 'fonts/11909.otf')

    doc
        .font('Header Font').fontSize(25)
        .text("Процент использования печатающих устройств", 100, 30)
        .text("относительно паспортных данных за " + moment(lastDay).format("MMMM YYYY"), 75, 60)
        .fontSize(12)
        .text("На дату: " + moment().format("DD MM YYYY"), 80, 110)
        .text("Страница: " + page, 480, 110)
        .moveTo(70, 100).lineTo(550, 100).lineWidth(3).stroke()
        .moveTo(49, 150).lineTo(49, 750).lineWidth(1).stroke()
        .moveTo(44, 745).lineTo(550, 745).lineWidth(1).stroke()
        .moveTo(275, 200).lineTo(275, 745).lineWidth(1).fillAndStroke("#eceff1","#eceff1")

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

        var yPos = 700;
        dev.map(dev => {

            if (yPos < 300){
                page = page +1;
                doc
                    .addPage()
                    .font('Header Font').fontSize(25)
                    .text("Процент использования печатающих устройств", 100, 30)
                    .text("относительно паспортных данных за " + moment(lastDay).format("MMMM YYYY"), 75, 60)
                    .fontSize(12)
                    .text("На дату: " + moment().format("DD MM YYYY"), 80, 110)
                    .text("Страница: " + page, 480, 110)
                    .moveTo(70, 100).lineTo(550, 100).lineWidth(3).stroke()
                    .moveTo(49, 150).lineTo(49, 750).lineWidth(1).stroke()
                    .moveTo(44, 745).lineTo(550, 745).lineWidth(1).stroke()
                    .moveTo(275, 150).lineTo(275, 745).lineWidth(1).fillAndStroke("#eceff1","#eceff1")
                yPos = 700
            }
            var grad = doc.linearGradient(50, yPos, 50+(dev.printouts * 450 / dev.monthlimit), yPos+10)
            grad.stop(0, "#4fc3f7")
                .stop(1, "#4dd0e1")
            doc
                .font('Header Font')
                .fillColor("#616161")
                .fontSize(8)
                .text(dev.unit + " " + "корпус: " + dev.build + " " + "кабинет: " + dev.office, 55, yPos - 22)
                .rect(50, yPos, dev.printouts * 450 / dev.monthlimit, 10).fillAndStroke(grad)
                .rect(50, yPos-10, 450, 10).fillAndStroke("#01579b", "#01579b")
                .text(dev.monthlimit , 510, yPos - 10)
                .fillColor("black")
                .font('Device Font')
                .text(dev.printouts + " (" + (100*dev.printouts/dev.monthlimit).toFixed(2) + "%)", dev.printouts * 450 / dev.monthlimit + 60, yPos+2)
            yPos = yPos - 40
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