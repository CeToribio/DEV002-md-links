const { mdLinks } = require('./index.js');

mdLinks('./carpeta/prueba.html')
    .then(() => { })
    .catch((error) => {
        console.log(error)
    })
