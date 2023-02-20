const { mdLinks } = require('./index.js');

mdLinks('./carpeta', { validate: true, stats: false })
    .then((result) => { result })
    .catch((error) => { console.log(error) })

    
