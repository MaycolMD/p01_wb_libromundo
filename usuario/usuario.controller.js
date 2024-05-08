const { throwCustomError } = require("../utils/functions");
const { createUsuarioMongo, getUsuarioMongo, updateUsuarioMongo, deleteUsuarioMongo } = require("./usuario.actions");

async function readUsuarioConFiltros(query) {
    const { identificacion, nombres, apellidos, email } = query;

    // hacer llamado a base de datos con el filtro de tipo
    const resultadosBusqueda = await getUsuarioMongo(query);

    return resultadosBusqueda;
}

async function createUsuario(datos) {
    const { identificacion, nombres, apellidos, telefono, email, password, visible } = datos;

    if (identificacion === undefined) {
        throwCustomError(501, "Digite su identificación");
    }

    const usuarios = await getUsuarioMongo({identificacion});

    if (usuarios.cantidadUsuarios === 0) {
        const usuarioCreado = await createUsuarioMongo(datos);

        return usuarioCreado;
    }

    throwCustomError(501, "Ya existe un usuario con ese nombre");
}


function updateUsuario(datos) {
    const { _id, identificacion, ...cambios } = datos;

    const usuarioActualizado = updateUsuarioMongo(identificacion, cambios);

    return usuarioActualizado;
}

function deleteUsuario(id) {
    const usuarioOcultado = deleteUsuarioMongo(id);

    return usuarioOcultado;
}

module.exports = {
    readUsuarioConFiltros,
    createUsuario,
    updateUsuario,
    deleteUsuario
}