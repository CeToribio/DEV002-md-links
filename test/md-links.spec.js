const { exist,
  absolute,
  recorrerArrayFiles,
  isDirectory,
  isFile,
  ext,
  arrayLinks,
  statsResult,
  statsAndValidate,
  readAllFilesRevuersive,
  allPromise
} = require('../data.js');

const arrayObjetos = [{
  href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array',
  text: 'Array',
  path: './carpeta/prueba.md'
},
{
  href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/export',
  text: 'Export',
  path: './carpeta/prueba.md'
}]

const arrayObjetoValidate = [{
  href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array',
  text: 'Array',
  path: './carpeta/prueba.md',
  status: 200,
  ok: 'OK'
},
{
  href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/export',
  text: 'Export',
  path: './carpeta/prueba.md',
  status: 200,
  ok: 'OK'
}]

const contenido = `ARCHIVO PRUEBA
[Array](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array)
[Export](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/export)
`
const files = [
  './carpeta/prueba.html',
  './carpeta/prueba.md',
  './carpeta/prueba2.md',
  './carpeta/subcarpeta/prueba3.md',
  './carpeta/subcarpeta/sub-subcarpeta/prueba2.js',
  './carpeta/subcarpeta/sub-subcarpeta/prueba4.md'
]

describe('exist, confirma si la ruta existe o no regresando un booleano', () => {
  it('debe ser una función', () => {
    expect(typeof exist).toBe('function')
  });
  it('debe regresar true', () => {
    expect(exist('./carpeta')).toBe(true)
  });
  it('debe regresar false', () => {
    expect(exist('./carpeta-noexiste')).toBe(false)
  });
});

describe('absolute, resuelve un ruta absoluta', () => {
  it('debe ser una función', () => {
    expect(typeof absolute).toBe('function')
  });
  it('debe regresar un path absoluto', () => {
    expect(absolute('./README.md')).toBe('/Users/cecitoribio/Laboratoria/DEV002-md-links/README.md')
  });
});

describe('isDirectory, confirma si es un directorio, regresando un booleano', () => {
  it('debe ser una función', () => {
    expect(typeof isDirectory).toBe('function')
  });
  it('debe regresar true', () => {
    expect(isDirectory('./carpeta')).toBe(true)
  });
});

describe('isFile, confirma si es un archivo, regresando un booleano', () => {
  it('debe ser una función', () => {
    expect(typeof isFile).toBe('function')
  });
  it('debe regresar true', () => {
    expect(isFile('./README.md')).toBe(true)
  });
});

describe('ext, retorna la extensión del archivo', () => {
  it('debe ser una función', () => {
    expect(typeof ext).toBe('function')
  });
  it('debe regresa ".md"', () => {
    expect(ext('./README.md')).toBe('.md')
  });
});

describe('recorrerArrayFiles, entrega el array de objetos luego de leer cada archivo', () => {
  it('debe ser una función', () => {
    expect(typeof recorrerArrayFiles).toBe('function')
  });
  it('retorna una promesa', () => {
    //const back = recorrerArrayFiles([])
    //console.log(back)
    expect(typeof recorrerArrayFiles([]).then).toBe('function')
  });
  it('retorna un array de objetos', () => {
    expect(recorrerArrayFiles(['./carpeta/prueba.md'])).resolves.toEqual(arrayObjetos)
  });
});

describe('arraylinks, entrega el array de objetos luego de hacer match con los links', () => {
  it('debe ser una función', () => {
    expect(typeof arrayLinks).toBe('function')
  });
  it('retorna un array de objetos', () => {
    expect(arrayLinks('./carpeta/prueba.md', contenido)).toEqual(arrayObjetos)
  });
});

describe('statsResult, entrega un objeto con dos propiedades total y unique', () => {
  it('debe ser una función', () => {
    expect(typeof statsResult).toBe('function')
  });
  it('retorna un objeto con dos propiedades', () => {
    expect(statsResult([arrayObjetos])).toEqual({Total: 1, Unique: 1})
  });
});

describe('statsAndValidate, entrega un objeto con tres propiedadess total, unique, broken', () => {
  it('debe ser una función', () => {
    expect(typeof statsAndValidate).toBe('function')
  });
  it('retorna un objeto con tres propiedades', () => {
    expect(statsAndValidate([arrayObjetos])).toEqual({Total: 1, Unique: 1, Broken: 0})
  });
});

describe('readAllFilesRevuersive, entrega un array de archivos', () => {
  it('debe ser una función', () => {
    expect(typeof readAllFilesRevuersive).toBe('function')
  });
  it('retorna un array con los archivos encontrados', () => {
    expect(readAllFilesRevuersive('./carpeta')).toEqual(files)
  });
});

describe('allPromise, entrega el array de objetos sumando el status y statustext', () => {
  it('debe ser una función', () => {
    expect(typeof allPromise).toBe('function')
  });
  it('retorna una promesa', () => {
    expect(typeof allPromise([]).then).toBe('function')
  });
  it('retorna un array de objetos', () => {
    expect(allPromise(arrayObjetos)).resolves.toEqual(arrayObjetoValidate)
  });
});
