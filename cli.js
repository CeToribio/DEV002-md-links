const { mdLinks } = require('./index.js');

mdLinks('./README-noexiste.md')
.then(() => {})
.catch((error) => {
    console.log(error)
})
