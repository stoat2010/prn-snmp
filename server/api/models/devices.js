var mongoose = require('mongoose');

var deviceShema = new mongoose.Schema({
    device: {type: String, required: true},
    build: {type: String, required: true},
    office: {type: String, required: true},
    unit: {type: String, required: true},
    balance: {type: Number, required: false},
    serial: {type: String, required: false},
    model: {type: String, required: false},
    vendor: {type: String, required: false},
    start_date: {type: Date, required: true},
    name: {type: String, required: true},
    inreport: {type: Boolean, required: true, default: false},
    monthlimit: {type: Number, required: false},
    type: {type: Number, required: true},
    col_balance: {type: Number, required: false, default:0},
    bw_balance: {type: Number, required: false, default:0}
});

mongoose.model('device', deviceShema, 'devices');