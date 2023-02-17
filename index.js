const { exist,
  absolute,
  readAllFiles,
  isFile,
  isDirectory,
  ext,
  recorrerArrayFiles,
  allPromise,
  statsResult,
  statsAndValidate,
  readAllFilesRevuersive } = require('./data.js');


const mdLinks = (route, options = { validate: false, stats: false }) => {
  return new Promise((resolve, reject) => {
    const arrayFiles = [];
    //const arrayObjetos = [];
    //identificar si la ruta existe envia un error 
    if (exist(route)) {
      //console.log('true')
      //convertir la ruta a absoluta
      const routeAbsolute = absolute(route)
      //console.log(routeAbsolute)
      //recorrer y obtener arrays de archivos
      if (isDirectory(routeAbsolute)) {
        //  console.log(arrayFiles)
        //readAllFiles(routeAbsolute, arrayFiles);
        const filerecursive = readAllFilesRevuersive(routeAbsolute)
        //console.log('recursive',filerecursive)
        filerecursive.forEach(file => {
          if (ext(file) === '.md') {
            //console.log(arrayFiles)
            arrayFiles.push(file)
          } else {
            if (arrayFiles === []) {
              console.log("no hay archivos .md")
            }
          }
        })
        //console.log(arrayFiles)
        //console.log(readAllFiles(route, arrayFiles));
        //console.log(arrayFiles)
      } else {
        //si es extension .md guarde 
        if (ext(routeAbsolute) === '.md') {
          //console.log(arrayFiles)
          arrayFiles.push(route)
        } else {
          console.log("no es un archivos .md")
        }
      }

      if (options.validate === true && options.stats === true) {
        console.log("elegiste ambas opciones")

        recorrerArrayFiles(arrayFiles)
          .then((result) => {
            //console.log(result)
            allPromise(result)
              .then((result) => {
                //console.log(result)
                const statsValidate = statsAndValidate(result)
                console.log("ambas opciones", statsValidate)
                resolve(statsValidate)
              })
          });

      } else if (options.validate === false && options.stats === true) {
        console.log("elegiste la opción stats")

        recorrerArrayFiles(arrayFiles)
          .then((result) => {
            //console.log(result)
            const stats = statsResult(result)
            console.log("opción stats", stats)
            resolve(stats)

          });

      } else if (options.validate === true && options.stats === false) {
        console.log("elegiste la opción validate ")

        recorrerArrayFiles(arrayFiles)
          .then((result) => {
            //console.log(result)
            allPromise(result)
              .then((result) => {
                const validate = result
                resolve(validate)
                console.log('opcion validate', validate)
              })
          });

      } else {
        console.log("No elegiste ninguna opción")

        recorrerArrayFiles(arrayFiles)
          .then((result) => {
            //console.log(result)
            const anyOption = result;
            resolve(anyOption)
            console.log('any option', anyOption)

            //console.log(promise)
            // const arrayPromise = result.map(element => {
            //   console.log(element.href)
            //  return( promise(element.href))
          });

      }

    } else {
      reject('La ruta no existe');
    }
  });

};



module.exports = {
  mdLinks,
};
