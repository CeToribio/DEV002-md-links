const { mdLinks } = require('./index.js');

mdLinks('./carpeta', { validate: false, stats: true })
    .then((result) => { result })
    .catch((error) => { console.log(error) })

    //aqui colocar los comandos de linea
    //los comandos nos ayudaran a convertir lo q ponen en el terminal a objetos
    //inicializar parametros