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
    name: {type: String, required: true}
});

mongoose.model('device', deviceShema, 'devices');