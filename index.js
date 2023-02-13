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
    const arrayFiles = [];
    
    //const arrayObjetos = [];
    //identificar si la ruta existe envia un error 
    if (exist(route)) {
      console.log('true')
      //convertir la ruta a absoluta
      const routeAbsolute = absolute(route)
      console.log(routeAbsolute)
      //recorrer y obtener arrays de archivos
      if (isDirectory(routeAbsolute)) {
        //  console.log(arrayFiles)
        console.log(readAllFiles(route, arrayFiles));
      } else {
        //si es extension .md guarde 
        if (ext(route) === '.md') {
          //console.log(arrayFiles)
          arrayFiles.push(route)
        } else {
          console.log("no hay archivos .md")
        }
      }

      //const arrayObjetos = [];
      //console.log(arrayObjetos)
     arrayFiles.forEach(file => {
        //console.log(file);
        arrayLinks(file)
        //console.log(arrayObjetos)
       
      });
      
      //promise(arrayObjetos)
      //console.log(arrayObjetos)
      //const arrayPromise = []
      //promise(arrayObjetos,arrayPromise)
      //const arrayObjetos = 
      //promise(arrayObjetos)
    


  // if (options[0] === undefined && options[1] === undefined) {
        
      // }
      // else if(options[0] === "--validate" && options[1] === undefined){

      // }
      // else if(options[0] === "--stats" && options[1] === undefined ){

      // }
      // else if(options[0] === "--validate" && options[1] === "--stats" ){

      // }



    } else {
      reject('La ruta no existe');
    }
  });

};



module.exports = {
  mdLinks,
};
