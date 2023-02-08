const { mdLinks } = require('./index.js');

mdLinks('./carpeta')
    .then(() => { })
    .catch((error) => {
        console.log(error)
    })
