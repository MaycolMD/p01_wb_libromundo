const { throwCustomError } = require("../utils/functions");
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { createUsuarioMongo, getUsuarioMongo, updateUsuarioMongo, deleteUsuarioMongo } = require("./usuario.actions");

async function readUsuarioConFiltros(query) {
    const { identificacion, nombres, apellidos, email } = query;

    if(!query.visible){
        query.visible = true
    }

    // hacer llamado a base de datos con el filtro de tipo
    const resultadosBusqueda = await getUsuarioMongo(query);

    return resultadosBusqueda;
}

async function createUsuario(datos) {
    const { identificacion, nombres, apellidos, telefono, email, password } = datos;
    
    if (identificacion === undefined) {
        throwCustomError(501, "Digite su identificación");
    }

    const usuarios = await getUsuarioMongo({identificacion});

    if (usuarios.cantidadUsuarios === 0) {
        try {

            const hashedPassword = await argon2.hash(password);

            datos.password = hashedPassword;

            datos.visible = true;

            const usuarioCreado = await createUsuarioMongo(datos);
            return usuarioCreado;

        } catch (error) {
            if (error.name === 'ValidationError') {
                throwCustomError(501, "No deje campos requeridos vacíos");
            }
        }
    }

    throwCustomError(501, "Ya existe un usuario con esa identificación");
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

async function iniciarSesion(datos) {
    const { identificacion, password } = datos;

    try {

        const usuariosFiltros = await getUsuarioMongo({ identificacion, visible: true });

        const usuario = usuariosFiltros.resultados[0];

        if (!usuario) {
            throwCustomError(401, 'Credenciales invalidas');
        }

        const contrasenaValida = await argon2.verify(usuario.password, password);

        if (!contrasenaValida) {
            throwCustomError(401, 'Credenciales invalidas');
        }

        const secret_key = process.env.SECRET_KEY

        const token = jwt.sign({ email: usuario.email, id: usuario.identificacion }, secret_key, { expiresIn: '1h' });

        return token;
    } catch (error) {
        throwCustomError(401, 'Credenciales invalidas o usuario no existente');
    }
}

module.exports = {
    readUsuarioConFiltros,
    createUsuario,
    updateUsuario,
    deleteUsuario,
    iniciarSesion
}