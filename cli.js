const { mdLinks } = require('./index.js');

mdLinks('./carpeta', {validate:true, stats:false})
    .then(() => { })
    .catch((error) => {
        console.log(error)
    })
