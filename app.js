var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =  require('cors');
var path = require('path');
var favicon = require('serve-favicon');

var appRouter = require('./routes/app');

var app = express();
global.config = require('./config.js');

app.set('port',global.config.server.port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/uploads', express.static(__dirname +'/uploads'));
app.use(favicon(path.join(__dirname,'public','favicon.ico')));

app.use('/app', appRouter);

require('./route').config(express,app);

module.exports = app;
