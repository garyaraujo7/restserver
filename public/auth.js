const miFormulario = document.querySelector('form');
//console.log(window.location.hostname.includes('localhost'))

const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/auth/'
            //? 'http://localhost:8080/'
            : 'https://restserver-curso-fher.herokuapp.com/api/auth/';

miFormulario.addEventListener('submit', ev =>{
    ev.preventDefault();
    const formData = {};
    for(let el of miFormulario.elements){
        if(el.name.length > 0 )
        formData[el.name] = el.value
    }
   // console.log(formData)
    fetch( url + 'login', {
        method: 'POST',
        body: JSON.stringify( formData ),
        headers: { 'Content-Type': 'application/json' },
    })
   .then( resp => resp.json() )
   /* .then(data=>{
        console.log(data)
    })
    .catch (err => {  
        console.log(err)
    })*/
    .then( ({ msg, token }) => {
        if(msg){
       //     window.location = '/';
            return console.error(msg);
        }
        localStorage.setItem('x-token',token);
      //  localStorage.setItem('utoken',token);
        window.location = '/home';
    })
    .catch (err => {  
        console.log(err)
    })
});
   