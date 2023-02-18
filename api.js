const { mdLinks } = require('./index.js');

mdLinks('./carpeta', { validate: false, stats: true })
    .then((result) => { result })
    .catch((error) => { console.log(error) })

    
    //inicializar parametros