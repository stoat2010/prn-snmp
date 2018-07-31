var mongoose = require('mongoose');

var printoutShema = new mongoose.Schema({
    device: {type: String, required: true},
    date: {type:Date, required: true},
    month: {type: Number, required: true},
    year: {type: Number, required: true},
    printouts: {type: Number, required: true}
});

mongoose.model('printout', printoutShema, 'printouts');