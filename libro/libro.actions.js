const Libro = require("./libro.model")

async function getLibroMongo(filtros) {
    const cantidadLibros = await Libro.countDocuments(filtros)
    const LibrosFiltrados = await Libro.find(filtros)

    return {
        resultados: LibrosFiltrados,
        // paginaMax: cantidadLibros / 20,
        // paginaActual: 1,
        cantidadLibros: cantidadLibros
    }
}

async function createLibroMongo(datos) {
    const LibroCreado = await Libro.create(datos)

    return LibroCreado
}

async function updateLibroMongo(_id, cambios) {
    const resultado = await Libro.findOneAndUpdate({_id}, cambios)

    return resultado
}

async function deleteLibroMongo(_id) {
    const resultado = await Libro.findOneAndUpdate({_id}, { visible: false })
    
    return resultado
}

module.exports = {
    createLibroMongo,
    getLibroMongo,
    updateLibroMongo,
    deleteLibroMongo
}