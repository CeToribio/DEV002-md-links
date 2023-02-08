const { exist,
  absolute,
  readAllFiles,
  isFile,
  isDirectory,
  ext } = require('./data.js');



const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    const arrayFiles = []
    //identificar si la ruta existe envia un error 
    if (exist(route)) {
      console.log('true')
      //convertir la ruta a absoluta
      console.log(absolute(route));
      //recorrer y obtener arrays de archivos
      if (isDirectory(route)) {
        //  console.log(arrayFiles)
        console.log(readAllFiles(route, arrayFiles));
      } else {
        //si es extension .md guarde 
        if (ext(route) === '.md') {
          console.log(arrayFiles)
          arrayFiles.push(route)
          
        }

      }

      //colocar los pasos a seguir para guiarte
    } else {
      reject('La ruta no existe');
    }
  });

};



module.exports = {
  mdLinks,
};
