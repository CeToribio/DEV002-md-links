const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { resolve } = require('path');


//si la ruta existe o no
const exist = (route) => fs.existsSync(route);
// regresa un booleano
// console.log(exist)

// metodo para convertir la ruta absoluta
const absolute = (route) => path.resolve(route)
// console.log(absolute)

//-------------- comprobar si es un archivo o un directorio con la clase isDirectory o isFile, regresa un booleano
//regresa un booleano
const isDirectory = (route) => fs.statSync(route).isDirectory();
const isFile = (route) => fs.statSync(route).isFile();

//------------------------obtener la extension de un archivo
const ext = (route) => path.extname(route);
// console.log(ext);


const regexLinks = /\[(.+?)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
const urlRegex = /\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
const textRegex = /\[(\w+.+?)\]/gi;

// funcion para recorrer los el array de files
const recorrerArrayFiles = (arrayFiles) => {
  const newArray = []
  return new Promise((resolve, reject) => {
   
    arrayFiles.map((file, index) => {
      //console.log(arrayFiles.length)
      // console.log(index)
      fs.readFile(`${file}`, 'utf-8', (err, contenido) => {
        if (err) {
          reject('error recorreArray');
        } else {
          newArray.push(arrayLinks(file, contenido));
          const merge = [].concat(...newArray)
          if (index === (arrayFiles.length - 1)) {
            //const newArray = arrayLinks(file, contenido)
            //console.log('newArray', newArray)
            //console.log('merge',merge)
            resolve(merge)
          }
        }
      });
    });
  });
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



// validacion de link
// const promise = (link) => {
//   arrayPromise = []
//   return new Promise((resolve,reject) => { 
//     arrayPromise.push(axios.get(link))
//     resolve (arrayPromise)

//   })
// } 
//---------prueba sin promesa
// const promise = (link) => {
//   const arrayPromise = []
//   arrayPromise.push(axios.get(link))
//   return arrayPromise

// }

//pruebaLinks.map(link => arrayPromise.push(axios.get(link)))

const allPromise = (arrayLinks) => {
  const validate = arrayLinks.map((link) => {
    return axios.get(link.href)
    .then((result) => {
      const objectValidate = {
        ...link,
        status: result.status,
        ok: result.statusText
      }
      //console.log(objectValidate)
      return objectValidate

    })
    .catch((err) => {
      //console.log(err);
      const objectValidate = {
        ...link,
        status: err?.result?.status,
        ok: "fail"
      }
      //console.log(objectValidate)
      return objectValidate

    })

  })

  return Promise.all(validate)

}

//obtener el resultado de la opcion stats
const statsResult = (arrayObjeto) => {
 const arrayLink = arrayObjeto.map(element => element.href);
 const uniqueLink = new Set(arrayLink);
 return {
      Total: arrayLink.length,
      Unique: uniqueLink.size
 }
}

//obtener el resultado de la opcion stats y validate
const statsAndValidate = (arrayObjeto) => {
  const arrayLink = arrayObjeto.map(element => element.href);
  const uniqueLink = new Set(arrayLink);
  const brokenLink = arrayObjeto.filter(element => element.ok === 'fail')
  return {
       Total: arrayLink.length,
       Unique: uniqueLink.size,
       Broken: brokenLink.length
  }
 }

//console.log(arrayPromise)

//acepta promesas no resueltas
// const allPromise =(arrayPromise)=>{
//   return new Promise ((resolve, reject)=> {
//     Promise.all(arrayPromise)
//     .then((result) => {
//       result.map(respuesta => {
//         resolve( {
//           status: console.log(respuesta.status),
//           ok: console.log(respuesta.statusText)
//         });
//       })
//     })
//     .catch((err) => console.log(err))
//   })

// }

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
  allPromise,
  statsResult,
  statsAndValidate

}