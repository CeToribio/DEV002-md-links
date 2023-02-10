const fs = require('fs');
const path = require('path');
const axios = require('axios')


// leer un archivo
// const regexLink = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
///(https?:\/\/)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gi
// const regex = new RegExp(regexLink);
// const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm
// const regexUlt = /\[([^\[]+)\](^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$)/gm
// const fullLinkOnlyRegex = /^\[([\w\s\d]+)\]\((https?:\/\/[\w\d./?=#]+)\)$/
// const regex = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/
const regexLinks = /\[(.+?)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
const urlRegex = /\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
const textRegex = /\[(\w+.+?)\]/gi;

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

//------------------------obtener la extension de un archivo

const ext = (route) => path.extname(route);
// console.log(ext);

//leer archivo y dar un array de objetos de links

fs.readFile('./README.md', 'utf-8', (err, contenido) => {
  const arrayObjetos = [];
  if (err) {
    // console.log(err);
  } else {
    //  console.log(contenido);
    //const condicion = regexLink
    //console.log(contenido.match(regexLink))
    if (regexLinks.test(contenido) === false) {
      //aumentar el router del file-  nose encontro link en
      console.log('no hay links para verificar')
    } else {
      //const matches = contenido.match(regexLinks)
      const matches = contenido.match(regexLinks)
      //console.log(matches)
      //const matchestext = contenido.match(textRegex)
      //console.log(matchestext)
      //const matchesLink = contenido.match(urlRegex)
      //console.log(matchesLink)
      matches.forEach((item, index, array) => {
        const matchestext = item.match(textRegex);
        //const unidadText = matchestext[0];
        //const puroText = unidadText.replace(/\[|\]/g, '').split(',');
        //console.log(matchestext)
        const matchesLink = item.match(urlRegex)
        const unidadLink = matchesLink[0];
        const puroLink = unidadLink.replace(/\(|\)/g, '').split(',');
        //arrayObjetos.push({ href: puroLink[0], text: puroText[0] })
        //console.log(arrayObjetos);

      }
        //console.loh(objetoLinks)
      );
    }
    //.test verifica expresion-regular.test(data) - si existe aplica el match para guardar en un array / no existe links para verificar

  }
})

//prueba validacion de link

const linkprueba = 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec';
const linkprueba2 = 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_Objects';

const pruebaLinks= ['https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec', 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_Objects']
const promesa1 = axios.get(linkprueba)
const promesa2 = axios.get(linkprueba2)
const objetoprueba = {href : 'link1' }

axios.get(linkprueba)
.then((result) => {
  //console.log(result.status)
  //console.log(result.statusText)
  objetoprueba.status = result.status
  objetoprueba.ok = result.statusText
  //console.log(objetoprueba)
})
arrayPromise = []
pruebaLinks.map(link => axios.get(link)
.then (resul => {
  
  arrayPromise.push(resul)
  //console.log(arrayPromise)
})
.catch (err => console.log(err))
)
//acepta promesas no resueltas
const all = Promise.all([promesa1,promesa2])
  .then((result )=> {
    return result.map(respuesta => console.log(respuesta.status))
  })
  .catch((err) => console.log(err))



//all.then(console.log)




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