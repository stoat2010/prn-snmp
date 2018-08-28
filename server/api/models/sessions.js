var mongoose = require('mongoose');

var sessionShema = new mongoose.Schema({
    lastAccess: {type: Date, default: Date.now},
    _sessionid: {type: String},
    coockie: {}
});

sessionShema.index({"lastAccess": 1},{expireAfterSeconds: 60*60*24})

mongoose.model('session', sessionShema, 'sessions');