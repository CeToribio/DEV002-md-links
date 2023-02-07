const fs = require('fs');
const path = require('path');

const mdLinks = (ruta,options) => {
  return new Promise((resolve, reject) => {
    //identificar si la ruta existe envia un error 
    if (fs.existsSync(ruta)) {
        // console.log('true')
    } else {
        reject('La ruta no existe');
    }
  });

};



module.exports = {
  mdLinks,
};
