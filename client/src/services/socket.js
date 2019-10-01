import SocketIOClient from 'socket.io-client';

const socket = SocketIOClient('/', {
    reconnectionDelay: 500,
    reconnection: true,
    reconnectionAttemps: 10,
    agent: false,
    upgrade: false,
    rejectUnauthorized: false
}); 

export default socket;
