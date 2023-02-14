const { exist,
  absolute,
  readAllFiles,
  isFile,
  isDirectory,
  ext,
  recorrerArrayFiles,
  promise,
  allPromise } = require('./data.js');



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
        
        const arrayObjetos = recorrerArrayFiles(arrayFiles)
        .then ((result) => {
          //console.log(result)
          allPromise(result)
          .then((result) => console.log(result))
      
          //console.log(promise)
          // const arrayPromise = result.map(element => {
          //   console.log(element.href)
          //  return( promise(element.href))
          });
          
          // console.log(arrayPromise)
          // allPromise(arrayPromise)
          // .then(result => console.log('res', result))
          
          //console.log('result',status)
          
          
        // })
        

        //console.log(arrayObjetos)
       
      // });
      
    // promise(arrayObjetos)
    // .then((result) => {
    //   console.log(result)
    // })
    


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
