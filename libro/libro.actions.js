const Libro = require("./libro.model")

async function getLibroMongo(filtros) {
    const cantidadLibros = await Libro.countDocuments(filtros);
    const LibrosFiltrados = await Libro.find(filtros);

    return {
        resultados: LibrosFiltrados,
        // paginaMax: cantidadLibros / 20,
        // paginaActual: 1,
        cantidadLibros: cantidadLibros
    };
}

async function createLibroMongo(datos) {
    const LibroCreado = await Libro.create(datos);

    return LibroCreado;
}

async function updateLibroMongo(id, cambios) {
    const resultado = await Libro.findByIdAndUpdate(id, cambios);

    return resultado
}

async function deleteLibroMongo(id) {
    const visible = false;
    const resultado = await Libro.findByIdAndUpdate(id, visible);
    
    return resultado;
}

module.exports = {
    createLibroMongo,
    getLibroMongo,
    updateLibroMongo,
    deleteLibroMongo
};