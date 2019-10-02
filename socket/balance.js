'use strict';

module.exports  = (io,socket)=>{

	socket.on('connected',(channel)=>{
		socket.join(channel);
	})

	socket.on('balance',(payload)=>{
		let {channel,balance,vouched} = payload;
		socket.broadcast.to(channel).emit('balance',{balance,vouched});
	})
}