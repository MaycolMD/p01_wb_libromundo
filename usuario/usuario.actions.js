const Usuario = require("./usuario.model")

async function getUsuarioMongo(filtros) {
    const cantidadUsuarios = await Usuario.countDocuments(filtros);
    const usuariosFiltrados = await Usuario.find(filtros);

    return {
        resultados: usuariosFiltrados,
        // paginaMax: cantidadUsuarios / 20,
        // paginaActual: 1,
        cantidadUsuarios: cantidadUsuarios
    };
}

async function createUsuarioMongo(datos) {
    const usuarioCreado = await Usuario.create(datos);

    return usuarioCreado;
}

async function updateUsuarioMongo(identificacion, cambios) {
    const resultado = await Usuario.findOneAndUpdate({identificacion}, cambios);

    return resultado
}

async function deleteUsuarioMongo(identificacion) {
    const resultado = await Usuario.findOneAndUpdate({identificacion}, { visible: false });
    
    return resultado;
}

module.exports = {
    createUsuarioMongo,
    getUsuarioMongo,
    updateUsuarioMongo,
    deleteUsuarioMongo
};