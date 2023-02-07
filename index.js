const { exist,
  absolute,
  readAllFiles,
  isFile,
  isDirectory,
  ext} = require('./data.js');

arrayFiles = []

const mdLinks = (route, options) => {
  return new Promise((resolve, reject) => {
    //identificar si la ruta existe envia un error 
    if (exist(route)) {
      console.log('true')
      //convertir la ruta a absoluta
      console.log(absolute(route));
      //recorrer y obtener arrays de archivos
      if(isDirectory(route)){
        readAllFiles(route, arrayFiles)
      } else {
        //si es extension .md guarde 
        if(ext(route) === '.md'){
          arrayFiles.push(route)
        }
        
      }
      console.log(arrayFiles)
      //colocar los pasos a seguir para guiarte
    } else {
      reject('La ruta no existe');
    }
  });

};



module.exports = {
  mdLinks,
};
