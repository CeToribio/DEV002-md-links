// funcion para recorrer los el array de files
// const recorrerArrayFiles = (arrayFiles) => {
//   const arrayObjetos = []
//   arrayFiles.forEach ( file => {
//           fs.readFile(`${file}`, 'utf-8', (err, contenido) => {
            
//             if (err) {
//               console.log(err);
//             } else {
//               arrayLinks(file,contenido,arrayObjetos)
//               return arrayObjetos
//             }
//   })
//  })
// }


//  funcion para encontrar links y botar el objeto
// const arrayLinks = (file, contenido, arrayObjetos = []) => {
//   if (regexLinks.test(contenido) === false) {
//      console.log('No hay links para verificar en la ruta ' + `${file}` )
//     } else {
//       const matches = contenido.match(regexLinks)
//         //console.log(matches)
//         matches.forEach((item) => {
//                   const matchestext = item.match(textRegex);
//                   let unidadText = "";
//                   let puroText = ['sin texto']
//                   if (matchestext) {
//                     //console.log(matchestext)
//                     unidadText = matchestext[0];
//                     puroText = unidadText.replace(/\[|\]/g, '').split(',');
//                   }
//                   const matchesLink = item.match(urlRegex)
//                   //console.log(matchesLink)
//                   const unidadLink = matchesLink[0];
//                   const puroLink = unidadLink.replace(/\(|\)/g, '').split(',');
        
//                   arrayObjetos.push({ href: puroLink[0], text: puroText[0], path:`${file}` })
//                   console.log('dentro',arrayObjetos)
//                   return arrayObjetos

// }
//         )}
// }

// function arrayLinks(arrayFiles) {
//     new Promise (resolve, rejec){
      
//     }
//     const arrayObjetos = [];
//     arrayFiles.forEach ( file => {
//       fs.readFile(`${file}`, 'utf-8', (err, contenido) => {
        
//         if (err) {
//           console.log(err);
//         } else {
//           //  console.log(contenido);
//           if (regexLinks.test(contenido) === false) {
//             //aumentar el router del file-  nose encontro link en
//             console.log('No hay links para verificar en la ruta ' + `${file}` )
//           } else {
//             const matches = contenido.match(regexLinks)
//             //console.log(matches)
//             matches.forEach((item) => {
//               const matchestext = item.match(textRegex);
//               let unidadText = "";
//               let puroText = ['sin texto']
//               if (matchestext) {
//                 //console.log(matchestext)
//                 unidadText = matchestext[0];
//                 puroText = unidadText.replace(/\[|\]/g, '').split(',');
//               }
//               const matchesLink = item.match(urlRegex)
//               //console.log(matchesLink)
//               const unidadLink = matchesLink[0];
//               const puroLink = unidadLink.replace(/\(|\)/g, '').split(',');
    
//               arrayObjetos.push({ href: puroLink[0], text: puroText[0], path:`${file}` })
//               console.log('dentro',arrayObjetos)
//               return arrayObjetos
//             });
            
//           }
//         }
//       });
//     })
//     console.log('dataarrayobjetos',arrayObjetos);
//     return arrayObjetos
    
//   }

//---- prueba de funcion md links

 //const arrayObjetos = [];
    //  const arrayObjetos = arrayFiles.map(file => {
        //console.log(file);
        //console.log(arrayObjetos);
        // const arrayObjetos = arrayLinks(arrayFiles)
        // console.log('arrayojetos',arrayObjetos)

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


//--------------------
  // recorrerArrayFiles(arrayFiles)
      //   .then((result) => {
      //     //console.log(result)
      //     console.log('stats', statsResult(result))
      //     allPromise(result)
      //       .then((result) => {
      //         console.log('validate&stats', statsAndValidate(result))
      //         console.log(result)
      //       })

      //     //console.log(promise)
      //     // const arrayPromise = result.map(element => {
      //     //   console.log(element.href)
      //     //  return( promise(element.href))
      //   });