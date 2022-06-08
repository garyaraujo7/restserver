/*

const url = ( window.location.hostname.includes('localhost') )
//? 'http://localhost:8080/'
? 'http://localhost:8080/auth/'
: 'https:///auth/';


let usuario = null;
let socket = null;
//Referencias del HTML
const lblOnline 	= document.querySelector('#lblOnline');
const lblOffline 	= document.querySelector('#lblOffline');
    
// Referencias HTML
//const u_nom = document.querySelector('#u_nom');
const UsuariosR = document.querySelector('#UsuariosR');
const UsuariosMA = document.querySelector('#UsuariosMA');
const UsuariosA = document.querySelector('#UsuariosA');
const UsuariosN = document.querySelector('#UsuariosN');
const UsuariosMN = document.querySelector('#UsuariosMN');

const btnSalir   = document.querySelector('#btnSalir');


const validarJWT = async(   req,   res ) =>{

    const token = localStorage.getItem('x-token') || '';
    console.log(token);
    if (token.length <= 10 ) {  
        window.location = '/';
        throw new Error('No hay Token en el servidor ');
    }   
    const resp = await fetch( url, {
        headers: { 'x-token': token }
    });

    const {usuario: userDB, token: tokenDB } = await resp.json();
   // console.log(userDB.rol ,tokenDB);
    localStorage.setItem('x-token', tokenDB);
    localStorage.setItem('u-token', tokenDB);
    usuario = userDB;
    UsuariosR.innerHTML = usuario.rol;
    UsuariosN.innerHTML = usuario.nombre;
   // u_nom.innerHTML = usuario;
    UsuariosMN.innerHTML = usuario.nombre;
    UsuariosA.innerHTML = usuario.apellidoP;
    UsuariosMA.innerHTML = usuario.apellidoP;
    await conectarSocket();

}
*//*
btnSalir.addEventListener('click', ()=> {
   console.log('desconectando');
	//localStorage.removeItem('x-token');
   // req.session.destroy();
   // res.send("logout success!");
   //session.destroy();
   
//	localStorage.clear();
    window.location = '/';   
});

const main = async()=>{
 //   await vv();
}
main();*/