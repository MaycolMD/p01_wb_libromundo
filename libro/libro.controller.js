const { throwCustomError } = require("../utils/functions");
const { createLibroMongo, getLibroMongo, updateLibroMongo, deleteLibroMongo } = require("./libro.actions");

async function readLibroConFiltros(query) {
    // hacer llamado a base de datos con el filtro de tipo
    
    if(!query.visible){
        query.visible = true
    }
    
    const resultadosBusqueda = await getLibroMongo(query);

    return resultadosBusqueda;
}

async function createLibro(datos) {
    
    datos.visible = true;

    const LibroCreado = await createLibroMongo(datos);
    return LibroCreado;

}


function updateLibro(datos) {
    const { _id, ...cambios } = datos;

    const LibroActualizado = updateLibroMongo(_id, cambios);

    return LibroActualizado;
}

function deleteLibro(id) {
    const LibroOcultado = deleteLibroMongo(id);

    return LibroOcultado;
}

module.exports = {
    readLibroConFiltros,
    createLibro,
    updateLibro,
    deleteLibro
}