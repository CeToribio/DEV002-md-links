const fs = require('fs');
const path = require('path');
const axios = require('axios');


//si la ruta existe o no
const exist = (route) => fs.existsSync(route);
// regresa un booleano
// console.log(exist)

// metodo para convertir la ruta absoluta
const absolute = (route) => path.resolve(route)
// console.log(absolute)

//-------------- comprobar si es un archivo o un directorio con la clase isDirectory o isFile, regresa un booleano
const isDirectory = (route) => fs.statSync(route).isDirectory();
const isFile = (route) => fs.statSync(route).isFile();

//---------------obtener la extension de un archivo
const ext = (route) => path.extname(route);
// console.log(ext);

// funcion para recorrer los el array de files
const recorrerArrayFiles = (arrayFiles) => {
  const newArray = []
  return new Promise((resolve, reject) => {

    arrayFiles.forEach((file, index) => {
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
            //return merge
          }
        }
      });
    });
  });
}

const regexLinks = /\[(.+?)\]\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
const urlRegex = /\((https?:\/\/[^\s]+)(?: "(.+)")?\)|(https?:\/\/[^\s]+)/ig;
const textRegex = /\[(\w+.+?)\]/gi;
//  funcion para encontrar links y botar el objeto
const arrayLinks = (file, contenido) => {
  const arrayObjetos = [];
  if (regexLinks.test(contenido) === false) {
    console.log('No hay links para verificar en la ruta ' + `${file}`)
    return []
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

// validacion de los links - entrega el objeto con status y ok
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
        //console.log(err.errno);
        const objectValidate = {
          ...link,
          status: err.response ? 404 : 'ERROR',
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

function readAllFilesRevuersive(route) {
  if (isDirectory(route)) {
    const files = fs.readdirSync(route)
    //readAllFilesRevuersive(files)
    return files.map((file) => {
      return readAllFilesRevuersive(`${route}/${file}`)
    }).flat()

  } else {
    return [route]
  }
}

// arrayOfFiles = []
// console.log(readAllFiles('./carpeta', arrayOfFiles ));


module.exports = {
  exist,
  absolute,
  isDirectory,
  isFile,
  ext,
  recorrerArrayFiles,
  allPromise,
  statsResult,
  statsAndValidate,
  readAllFilesRevuersive,
  arrayLinks

}