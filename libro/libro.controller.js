const { throwCustomError } = require("../utils/functions");
const { createLibroMongo, getLibroMongo, updateLibroMongo, deleteLibroMongo } = require("./libro.actions");

async function readLibroConFiltros(query) {
    // hacer llamado a base de datos con el filtro de tipo

    if (!query.visible) {
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

async function updateLibro(datos) {
    const { _id, sesion, propietario, ...cambios } = datos;

    const resultadosBusqueda = await getLibroMongo({ _id, visible: true });

    const resultado = resultadosBusqueda.resultados[0]

    if (!resultado) {
        throwCustomError(404, 'El libro '+ _id + ' no existe');
    }

    if (propietario && propietario !== resultado.propietario.toString() ) {
        throwCustomError(400, "No puede cambiar el propietario así")
    }

    if (Number(resultado.propietario) === sesion) {
        const LibroActualizado = updateLibroMongo(_id, cambios);

        return LibroActualizado;
    } else {
        throwCustomError(403, "Ese libro no le pertenece, no puede editarlo")
    }

}

async function deleteLibro(datos) {
    const { _id, sesion } = datos;

    const resultadosBusqueda = await getLibroMongo({ _id, visible: true });

    const resultado = resultadosBusqueda.resultados[0]

    if (!resultado) {
        throwCustomError(404, 'El libro '+ _id + ' no existe');
    }

    if (Number(resultado.propietario) === sesion) {
        const LibroOcultado = deleteLibroMongo(_id);

        return LibroOcultado;
    } else {
        throwCustomError(403, "Ese libro no le pertenece, no puede eliminarlo")
    }

}

module.exports = {
    readLibroConFiltros,
    createLibro,
    updateLibro,
    deleteLibro
}