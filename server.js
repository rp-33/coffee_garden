let app = require('./app');
require('./configuration/db.js');
let server = require('http').createServer(app);

var io = require('socket.io')(server)
var balance =  require('./socket/balance');
io.on('connection', socket => {
	console.log(socket.id)
  	balance(io,socket);
})

server.listen(app.get('port'), () => {
	console.log('port ' + app.get('port'));
});