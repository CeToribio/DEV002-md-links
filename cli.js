#!/usr/bin/env node
//console.log('hello wordl')

//const path = require('path');
const process = require('process');
//const { argv } = require('process')
const { mdLinks } = require('./index.js');
//console.log(process)
//argv contiene los argumentos que vamos a escribir en la terminal
// array con path del bin y del archivo actual
//console.log(argv)
const arg1 = process.argv
//console.log(arg1)
const arg2 = process.argv[1]
//console.log(arg2)
const route = process.argv[2]
console.log(route)
const opcion1 = process.argv[3]
//console.log(arg4)
const opcion2 = process.argv[4]

// const [, , ...args] = process.argv

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
    } 
}
