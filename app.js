var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/app');

var app = express();
global.config = require('./config.js');


app.set('port',global.config.server.port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static(__dirname +'/uploads'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/app', indexRouter);

module.exports = app;
