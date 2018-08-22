var mongoose = require('mongoose');
var Loc = mongoose.model('device');
var LocPrint = mongoose.model('printout');

var moment = require('moment');
require('moment/locale/ru');
moment.locale('ru');

module.exports.pdfCreate = async function (req, res) {

    const PDFDocument = require('pdfkit');
    var devices = await getDev();

    let filename = 'report.pdf'

    res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
    res.setHeader('Content-type', 'application/pdf')

    const doc = new PDFDocument;

    doc.registerFont('Header Font', 'fonts/ucmi.ttf')
    doc.registerFont('Device Font', 'fonts/12108.ttf')
    doc.registerFont('SubHeader Font', 'fonts/11909.otf')

    doc.font('Header Font').fontSize(25)

    //var headerText = "Отчет по состоянию сетевой печатающей техники на: " + new Date().toLocaleDateString();
    var headerText = "Отчет по состоянию сетевой печатающей техники на: " + moment().format("DD MMMM YYYY");
    var x = doc.x + 40, y = doc.y, h = 600, w = 400;
    var optionsHeader = { width: w, align: 'center' };
    doc.rect(x, y, w, h).stroke();

    doc.text(headerText, x, y + 0.5 * (h - doc.heightOfString(headerText, optionsHeader)), optionsHeader);

    const results = devices.map(async (device) => {

        var balance = await balanceLoad(device.device);
        var dtGraph = await dataGraph(device.device, balance);
        var dayGraph = await dateGraph(device.device);

        var dev1 = JSON.parse(JSON.stringify(device));
        dev1.dtgraph = dtGraph;
        dev1.daygraph = dayGraph;

        return dev1;
    });

    await Promise.all(results).then(dev => {

        dev.map(dev => {

            var xxx = 60;
            var grData = dev.dtgraph;
            var nans = grData.pop()
            var dtgraphMax = Math.max(...grData);
            var grDay = dev.daygraph;
            var nans1 = grDay.pop()
            var pageNum = 2;

            doc.addPage()
                .font('Header Font').fontSize(25)
                .text(dev.model, 100, 100)
                .fontSize(16)
                .text("Отпечатки помесячно", 230, 340)
                .moveTo(10, 130).lineTo(600, 130).lineWidth(5).stroke()
                .moveTo(10, 730).lineTo(600, 730).lineWidth(5).stroke()
                .font('Device Font')
                .fontSize(12)
                .text("Данные устройства:", 20, 215)
                .font('Device Font')
                .fontSize(12)
                .text("Подразделение: ", 40, 155)
                .text("Корпус: ", 40, 170)
                .text("Кабинет: ", 40, 185)
                .text(dev.unit, 300, 155)
                .text(dev.build, 300, 170)
                .text(dev.office, 300, 185)
                .moveTo(10, 200).lineTo(600, 200).lineWidth(1).stroke()
                .text("Производитель:", 40, 240)
                .text("Серийный номер:", 40, 255)
                .text("Сетевое имя:", 40, 270)
                .text("IP:", 40, 285)
                .text("Принят на обслуживание:", 40, 300)
                .text(dev.vendor, 300, 240)
                .text(dev.serial, 300, 255)
                .text(dev.name, 300, 270)
                .text(dev.device, 300, 285)
                .text(moment(dev.start_date).format("DD MMMM YYYY"), 300, 300)
                .moveTo(10, 315).lineTo(600, 315).lineWidth(1).stroke()
                .moveTo(55, 385).lineTo(550, 385).lineWidth(1).stroke()
                .moveTo(45, 652).lineTo(550, 652).lineWidth(1).stroke()
                .moveTo(50, 657).lineTo(50, 420).lineWidth(1).stroke()
                .fontSize(10)
                .text("  Янв", 60, 370)
                .text("  Фев", 100, 370)
                .text("  Мар", 140, 370)
                .text("  Апр", 180, 370)
                .text("  Май", 220, 370)
                .text("  Июн", 260, 370)
                .text("  Июл", 300, 370)
                .text("  Авг", 340, 370)
                .text("  Сен", 380, 370)
                .text("  Окт", 420, 370)
                .text("  Ноя", 460, 370)
                .text("  Дек", 500, 370)

            grData.map(dtgr => {

                if (isNaN(dtgr)) { dtgr = 0 };
                if (dtgr === 0) { var dtgrprint = "" } else { var dtgrprint = dtgr };

                if (dtgr < 10) {
                    doc
                        .fillColor("black")
                        .text(dtgrprint, xxx + 10, 390)
                } else if (dtgr > 10 & dtgr <= 999) {
                    doc
                        .fillColor("black")
                        .text(dtgrprint, xxx + 8, 390)
                } else {
                    doc
                        .fillColor("black")
                        .text(dtgrprint, xxx + 5, 390)
                }

                if (dtgr > 0) {
                    doc
                        .rect(xxx + 10, 450, 20, dtgr * 200 / dtgraphMax).fillAndStroke("#efebe9", "#d7ccc8")
                } else {
                    doc
                        .rect(xxx + 10, 650, 20, 0).fillAndStroke("#efebe9", "#d7ccc8")
                }

                xxx = xxx + 40;
                doc
                    .moveTo(xxx - 5, 375).lineTo(xxx - 5, 395).lineWidth(1).stroke("black")
                    .moveTo(xxx - 20, 652).lineTo(xxx - 20, 657).lineWidth(1).stroke("black")

            })
            var xxx = 60;
            grDay.map(dtgr => {

                if (dtgr === 0) { var dtgrprint = "" } else { var dtgrprint = moment(dtgr).format("DD.MM.YYYY") };
                doc
                    .fontSize(8)
                    .fillColor("black")
                    .text(dtgrprint, xxx + 5, 660)
                xxx = xxx + 40;
            })
        });
    });

    doc.pipe(res);
    doc.end();
}

async function getDev() {
    return new Promise(resolve => {
        Loc
            .find({"inreport": true}, function (err, document) {
                if (err) {
                    console.log(err);
                } else {
                    resolve(document);
                }
            })
    })
}

function balanceLoad(req) {
    return new Promise(resolve => {
        Loc.find({ device: req }, { balance: 1, _id: 0 }, function (err, balance) {
            if (err) {
                console.log(err);
            } else {
                resolve(balance);
            }
        })
    })
}

function dataGraph(devparam, balance) {

    return new Promise(resolve => {
        var prouts = [0];

        LocPrint
            .find({ device: devparam, year: new Date().getFullYear() }, { printouts: 1, month: 1, _id: 0 }).sort({ date: 1 }).limit(12)
            .exec(function (err, device) {
                if (err) {
                    console.log(err)
                } else {

                    var months = device.map(item => item.month);
                    var maxMonth = Math.max.apply(null, months);
                    var firstMonth = Math.min.apply(null, months);
                    var arr01 = device.map(item => item.printouts);
                    var k = maxMonth - arr01.length;
                    var bal1 = balance.map(item => item.balance);

                    for (var j = 0; j < k; j++) {
                        var t = arr01.unshift(0);
                    };

                    for (var i = 1; i <= maxMonth; i++) {
                        if (i === firstMonth - 1 && firstMonth > 0) {
                            var val = arr01[i] - bal1[0];
                        } else {
                            var val = arr01[i] - arr01[i - 1];
                        }
                        prouts.push(val);
                    }
                    resolve(prouts);
                }
            });
    })
};

function dateGraph(devparam) {

    return new Promise(resolve => {
        var prouts = [0];

        LocPrint
            .find({ device: devparam, year: new Date().getFullYear() }, { date: 1, month: 1, _id: 0 }).sort({ date: 1 }).limit(12)
            .exec(function (err, device) {
                if (err) {
                    console.log(err)
                } else {

                    var months = device.map(item => item.month);
                    var maxMonth = Math.max.apply(null, months);
                    var firstMonth = Math.min.apply(null, months);

                    var arr01 = device.map(item => item.date);
                    var k = maxMonth - arr01.length;

                    for (var j = 0; j < k; j++) {
                        var t = arr01.unshift(0);
                    };

                    for (var i = 1; i <= maxMonth; i++) {
                        var val = arr01[i];
                        prouts.push(val);
                    }
                    resolve(prouts);
                }
            });
    })
};