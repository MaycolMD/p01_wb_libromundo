const express = require('express')
const jwt = require('jsonwebtoken');

require('dotenv').config();

const router = express.Router();
const { readUsuarioConFiltros, createUsuario, updateUsuario, deleteUsuario, iniciarSesion } = require("./usuario.controller");
const { respondWithError } = require('../utils/functions');

// Middleware de autenticación JWT
function middlewareAutenticacion(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(401).json({ mensaje: 'Token no proporcionado' });
    }

    const secret_key = process.env.SECRET_KEY

    jwt.verify(token, secret_key, (err, usuario) => {
        if (err) {
            return res.status(401).json({ mensaje: 'Token inválido' });
        }

        req.user = usuario;
        next(); 
    });
}

async function GetUsuarios(req, res) {
    try {
        // llamada a controlador con los filtros
        const resultadosBusqueda = await readUsuarioConFiltros(req.query);

        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch(e) {
        res.status(500).json({msg: ""})
    }
}

async function PostUsuario(req, res) {
    try {
        // llamada a controlador con los datos
        await createUsuario(req.body);

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}


async function PatchUsuario(req, res) {
    try {
        // llamada a controlador con los datos
        updateUsuario({...req.body, sesion: req.user.id});

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}


async function DeleteUsuario(req, res) {
    try {
        // llamada a controlador con los datos
        deleteUsuario(req.user.id);

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

router.post("/login", async (req, res) => {
    try {
        const token = await iniciarSesion(req.body);
        
        res.status(200).json({ 
            token 
        });
    } catch (error) {
        respondWithError(res, error);
    }

});

router.get("/", middlewareAutenticacion, GetUsuarios);
router.post("/", PostUsuario);
router.patch("/", middlewareAutenticacion, PatchUsuario);
router.delete("/", middlewareAutenticacion, DeleteUsuario);


module.exports = router;