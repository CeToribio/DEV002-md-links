#!/usr/bin/env node
//console.log('hello wordl')

const process = require('process');
const { mdLinks } = require('./index.js');
//console.log(process)
//argv contiene los argumentos que vamos a escribir en la terminal

const route = process.argv[2]
//console.log(route)
const opcion1 = process.argv[3]
//console.log(opcion1)
const opcion2 = process.argv[4]
//console.log(opcion2)


if (route) {
    if (opcion1 === undefined && opcion2 === undefined) {
        mdLinks(route, { validate: false, stats: false })
            .then(result => result)
    } else if (opcion1 === '--validate' && opcion2 === undefined) {
        mdLinks(route, { validate: true, stats: false })
            .then(result => result)
    } else if (opcion1 === '--stats' && opcion2 === undefined) {
        mdLinks(route, { validate: false, stats: true })
            .then(result => result)
    } else if ((opcion1 === '--validate' && opcion2 === '--stats') || (opcion1 === '--stats' && opcion2 === '--validate')) {
        mdLinks(route, { validate: true, stats: true })
            .then(result => result)
    } else {
        console.log('revisa los parametros escritos')
    }
}

//aqui colocar los comandos de linea
//los comandos nos ayudaran a convertir lo q ponen en el terminal a objetos