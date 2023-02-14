const { mdLinks } = require('./index.js');

mdLinks('./README.md', {validate:false, stats:false})
    .then(() => { })
    .catch((error) => {
        console.log(error)
    })

    //aqui colocar los comandos de linea
    //los comandos nos ayudaran a convertir lo q ponen en el terminal a objetos
    //inicializar parametros