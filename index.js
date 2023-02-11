const { exist,
  absolute,
  readAllFiles,
  isFile,
  isDirectory,
  ext,
  arrayLinks,
  promise } = require('./data.js');



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
        } else {
          console.log("no hay archivos .md")
        }
      }

      const arrayObjetos = []
      arrayFiles.map(file => {
         
        //console.log(file);
        arrayLinks(file, arrayObjetos)

      });

      // const arrayPromise = []
      // //promise(arrayObjetos,arrayPromise)
      // promise(arrayObjetos)

      //colocar los pasos a seguir para guiarte
    } else {
      reject('La ruta no existe');
    }
  });

};



module.exports = {
  mdLinks,
};
