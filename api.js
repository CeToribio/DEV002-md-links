const { mdLinks } = require('./index.js');

mdLinks('./readme-prueba.md', { validate: true, stats: false })
    .then((result) => { result })
    .catch((error) => { console.log(error) })

    
    //inicializar parametros