const { exist,
  absolute,
  readAllFiles,
  isFile,
  isDirectory,
  ext,
  recorrerArrayFiles,
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
    //  const arrayObjetos = arrayFiles.map(file => {
        //console.log(file);
        //console.log(arrayObjetos);
        // const arrayObjetos = arrayLinks(arrayFiles)
        // console.log('arrayojetos',arrayObjetos)
        
        const arrayObjetos = recorrerArrayFiles(arrayFiles)
        .then ((result) => {
          console.log('arrayObjetos',result)
        })
        

        //console.log(arrayObjetos)
       
      // });
      
    // promise(arrayObjetos)
    // .then((result) => {
    //   console.log(result)
    // })
      
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
