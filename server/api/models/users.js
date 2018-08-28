var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userShema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

userShema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8),null)
}

userShema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

mongoose.model('user', userShema, 'users');