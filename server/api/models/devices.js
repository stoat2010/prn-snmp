var mongoose = require('mongoose');

var deviceShema = new mongoose.Schema({
    device: {type: String, required: true},
    build: {type: String, required: true},
    office: {type: String, required: true},
    unit: {type: String, required: true},
    balance: {type: Number, required: false}
});

mongoose.model('device', deviceShema, 'devices');