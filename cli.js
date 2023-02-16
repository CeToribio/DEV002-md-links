#!/usr/bin/env node
console.log('hello wordl')

const process = require('process');
//const { argv } = require('process')
const { mdLinks } = require('./index.js');
//console.log(process)
//argv contiene los argumentos que vamos a escribir en la terminal
// array con path del bin y del archivo actual
//console.log(argv)
const arg1 = process.argv
console.log(arg1)
const arg2 = process.argv[1]
console.log(arg2)
const route = process.argv[2]
//console.log(arg3)
const opcion1 = process.argv[3]
//console.log(arg4)
const opcion2 = process.argv[3]

// const [, , ...args] = process.argv
if (opcion1) {
    mdLinks(route)
        .then(resul => console.log(resul))
}
