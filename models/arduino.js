//const http = require('http');
//const express = require('express');

//const socketIO = require('socket.io');

//const app = express();
//const server = http.createServer(app);
//const io = .listen(server);
//const io = require('socket.io')(server);
//app.use(express.static(__dirname + '/public'));
/*
server.listen(3000, function () {
	console.log('server se escucha en el puerto ', 3000);
});*/
//const port = 3000

//SERIAL COMUNICACION
//const { SerialPort } = require('serialport');
//const { ReadlineParser } = require('@serialport/parser-readline');
/*
const port = new SerialPort({
	path: 'COM3',
	baudRate: 9600,
	autoOpen: false,
});*/

//const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
//parser.on('data', console.log)
/*
port.open(function (err) {
	if (err) {
		return console.log('Error opening port: ', err.message);
	}
});
*//*
parser.on('data', function (data) {
	let temp = parseInt(data, 10) + ' ºC';
	console.log(temp);
	io.emit('temp', data);
});
*/