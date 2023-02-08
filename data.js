const fs = require('fs');
const path = require('path');

// leer un archivo
const regexLink = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
// var regex = new RegExp(regexLink);

//si la ruta existe o no
const exist = (route) => fs.existsSync(route);
// regresa un booleano
// console.log(exist)

// ------------ metodo para convertir la ruta absoluta
const absolute = (route) => path.resolve(route)

// console.log(absolute)

//-------------- comprobar si es un archivo o un directorio con la clase isDirectory o isFile, regresa un booleano
// fs.stat('README.md',(err,contenido) => {
//   if(err){
//     console.log(err);
//     throw err
//   } else {
//     console.log(contenido.isFile())
//   }
// });

const isDirectory = (route) => fs.statSync(route).isDirectory();
const isFile = (route) => fs.statSync(route).isFile();

//leer archivo

fs.readFile('README.md', 'utf-8', (err, contenido) => {
  if (err) {
    // console.log(err);
  } else {
    //  console.log(contenido);
    // const condicion = regexLink
    // console.log(contenido.match(regex))
   

  }
})


//------------------------obtener la extension de un archivo

const ext = (route) => path.extname(route);
// console.log(ext);

// -------------------obtener los archivos de un directorio

// let files = []
// fs.readdir('./new-file',(err, contenido) => {
//   if(err) {
//     console.error(err)
//     // throw Error(err)
//   }
//   files = contenido
//   console.log(files)
// }) 

// -------------- obtener los archivos de un directorio de forma individual
// const extension = []
// fs.readdir('./new-file', (err, archivos) => {
//   if (err) {
//     console.error(err)
//     // throw Error(err)
//   }
//     archivos.forEach(archivo => {
//     // extension = path.extname(archivo)
//     // console.log(extension);
//     if(path.extname(archivo) === '.md'){
//       const md = extension.push(archivo)
//     //   console.log(extension)
//     }

//   });
// })

// -----------------funcion recursiva
// const arrayOfFiles = []
function readAllFiles(route, newarray = []) {
  const files = fs.readdirSync(route)
  //console.log(files);
  files.forEach(file => {
    const stat = fs.statSync(`${route}/${file}`)
    // console.log(stat.isDirectory());
    if (stat.isDirectory()) {
      readAllFiles(`${route}/${file}`, newarray)
    } else {
      //validar una extension .md
      if (path.extname(file) === '.md') {
        newarray.push(`${route}/${file}`)
      }
    }
  });

  // console.log(newarray)
  return newarray

}

// arrayOfFiles = []
// console.log(readAllFiles('./carpeta', arrayOfFiles ));


module.exports = {
  exist,
  absolute,
  readAllFiles,
  isDirectory,
  isFile,
  ext
}