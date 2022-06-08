//Referencias del HTML

const lblOnline 	= document.querySelector('#lblOnline');
const lblOffline 	= document.querySelector('#lblOffline');

const socket = io();

socket.on('connect', () => {
	console.log('Conectado / Socket-client  ');
	
	lblOnline.style.display = '';
	lblOffline.style.display = 'none';
});
socket.on('disconnect', () => {
	console.log('Desconectado / Socket-client ');
	lblOnline.style.display = 'none';
	lblOffline.style.display = '';
});


//esto sirve no tocar
//socket.on('temp', (data) => {
//  console.log(data);
// let temp = document.getElementById('temperature');
//io.innerHTML = `${data}`;
//});
/*socket.on('data', (data) => {
	console.log("ya llega aqui ");
	console.log(data.toString());
	io.innerHTML = `${data}`;
});*/
