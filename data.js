const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { resolve } = require('path');

// const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm
// const fullLinkOnlyRegex = /^\[([\w\s\d]+)\]\((https?:\/\/[\w\d./?=#]+)\)$/
// const regex = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/

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
// function readfile(file){
//   fs.readFile(`${file}`, 'utf-8', (err,contenido) => {
//     console.log(contenido)
//   })
// }

const regexLinks = /\[(.+?)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
const urlRegex = /\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
const textRegex = /\[(\w+.+?)\]/gi;

// funcion para recorrer los el array de files
const recorrerArrayFiles = (arrayFiles) => {
  const newArray = []
  return new Promise((resolve, reject) => {
    arrayFiles.forEach((file,index) => {
      //console.log(arrayFiles.length)
      // console.log(index)
      fs.readFile(`${file}`, 'utf-8', (err, contenido) => {
        if (err) {
          reject ('error recorreArray');
        } else {
            newArray.push(arrayLinks(file, contenido))
            //const newArray = arrayLinks(file, contenido)
          //console.log('newArray', newArray)
           if(index === (arrayFiles.length - 1)){
            const merge = [].concat(...newArray)
            //console.log('merge',merge)
            resolve (merge)
           }
        }
      })
    }) 
    
    
  })
  

}


//  funcion para encontrar links y botar el objeto
const arrayLinks = (file, contenido) => {
  const arrayObjetos = []
  if (regexLinks.test(contenido) === false) {
    console.log('No hay links para verificar en la ruta ' + `${file}`)
  } else {
    const matches = contenido.match(regexLinks)
    //console.log(matches)
    matches.forEach((item) => {
      const matchestext = item.match(textRegex);
      let unidadText = "";
      let puroText = ['sin texto']
      if (matchestext) {
        //console.log(matchestext)
        unidadText = matchestext[0];
        puroText = unidadText.replace(/\[|\]/g, '').split(',');
      }
      const matchesLink = item.match(urlRegex)
      //console.log(matchesLink)
      const unidadLink = matchesLink[0];
      const puroLink = unidadLink.replace(/\(|\)/g, '').split(',');

      arrayObjetos.push({ href: puroLink[0], text: puroText[0], path: `${file}` })
      //console.log('dentro',arrayObjetos)
      //return arrayObjetos

    })
    //console.log('fuera del foreach', arrayObjetos)
    return arrayObjetos;
  }
}


//prueba validacion de link

const linkprueba = 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec';
const linkprueba2 = 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_Objects';

const pruebaLinks = ['https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec', 'https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_Objects',
  'https://app.netlify.com/sites/whimsical-cupcake-2f7f32/deploys/63b70d41d0fcc60d8e524575']
const promesa1 = axios.get(linkprueba)
const promesa2 = axios.get(linkprueba2)
const objetoprueba = { href: 'link1' }

axios.get(linkprueba)
  .then((result) => {
    //console.log(result.status)
    //console.log(result.statusText)
    objetoprueba.status = result.status
    objetoprueba.ok = result.statusText
    //console.log(objetoprueba)
  })

arrayPromise = []
//const promise = (arrayLinks, arrayPromise = [] ) => { arrayLinks.map (link => arrayPromise.push(axios.get(link.href)))}
pruebaLinks.map(link => arrayPromise.push(axios.get(link)))
//tengo q obtener los links recorriendo
//esta leyendo el array vacio
//revisar como otras ideas para poder leer el array de los links
const promise = (arrayLinks) => console.log(arrayLinks)
//muestra el erro pero muestra los corectos
// pruebaLinks.map(link => axios.get(link)
//   .then((result) => {

//       return {
//         status: console.log(result.status),
//         ok: console.log(result.statusText)
//       }
//     })

//   .catch((err) => console.log(err))
// )
//se puede hacer desde como lo pense iterando en esta funcion y resolviendo aqui

//console.log(arrayPromise)

//Mauro return axios.get(url).then(res=> return ….)
//acepta promesas no resueltas
//const allPromise =(arrayPromise)=>{
Promise.all(arrayPromise)
  .then((result) => {
    result.map(respuesta => {
      return {
        status: console.log(respuesta.status),
        ok: console.log(respuesta.statusText)
      };
    })
  })
  .catch((err) => console.log(err))
//}

//console.log (all.then)




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
  ext,
  recorrerArrayFiles,
  promise,

}