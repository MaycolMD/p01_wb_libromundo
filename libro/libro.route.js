const express = require('express')
const jwt = require('jsonwebtoken');

require('dotenv').config();

const router = express.Router();
const { readLibroConFiltros, createLibro, updateLibro, deleteLibro } = require("./libro.controller");
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

async function GetLibros(req, res) {
    try {

        // llamada a controlador con los filtros
        const resultadosBusqueda = await readLibroConFiltros(req.query);

        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch(e) {
        res.status(500).json({msg: ""})
    }
}

async function PostLibro(req, res) {
    try {
        // llamada a controlador con los datos
        await createLibro({...req.body, propietario: req.user.id});

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}


async function PatchLibro(req, res) {
    try {
        // llamada a controlador con los datos
        await updateLibro({...req.body, sesion: req.user.id});

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}


async function DeleteLibro(req, res) {
    try {
        // llamada a controlador con los datos
        await deleteLibro({_id: req.query._id, sesion: req.user.id});

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

router.get("/", GetLibros);
router.post("/", middlewareAutenticacion, PostLibro);
router.patch("/", middlewareAutenticacion, PatchLibro);
router.delete("/", middlewareAutenticacion, DeleteLibro);


module.exports = router;