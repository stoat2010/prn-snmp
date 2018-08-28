const mongoose = require('mongoose');
require('./devices'); //Схема для продуктов
require('./printouts'); //Схема для отпечатков
require('./users'); //Схема для пользователей
require('./sessions'); //Схема для сессий

mongoose.Promise = global.Promise;

var dbURI = "mongodb://127.0.0.1:27017/prn002";
mongoose.connect(dbURI,{ useNewUrlParser: true });

mongoose.connection.on('connected', () => {console.log("connected to MongoDB: " + dbURI);});
mongoose.connection.on('error', (err) => {console.log("connection error: " + err);});
mongoose.connection.on('disconnected', () => {console.log("disconnected from MongoDB");});

const gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function(){
        console.log('mongoose disconnected through ' + msg);
        callback();
    });
};

process.once('SIGUSR2', () => {gracefulShutdown('nodenmon restart', () => {process.kill(process.pid, 'SIGUSR2');});});
process.on('SIGINT', () => {gracefulShutdown('app termination', () => {process.exit(0);});});