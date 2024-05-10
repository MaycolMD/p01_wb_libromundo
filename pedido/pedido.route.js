const express = require('express')
const jwt = require('jsonwebtoken');

require('dotenv').config();

const router = express.Router();
const { readPedidoConFiltros, createPedido, updatePedido, deletePedido } = require("./pedido.controller");
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

async function GetPedidos(req, res) {
    try {
        // llamada a controlador con los filtros
        const resultadosBusqueda = await readPedidoConFiltros(req.query);

        res.status(200).json({
            ...resultadosBusqueda
        })
    } catch(e) {
        res.status(500).json({msg: ""})
    }
}

async function PostPedido(req, res) {
    try {
        // llamada a controlador con los datos
        await createPedido({...req.body, comprador: req.user.id});

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}


async function PatchPedido(req, res) {
    try {
        // llamada a controlador con los datos
        await updatePedido({ ...req.body, sesion: req.user.id });

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}


async function DeletePedido(req, res) {
    try {
        // llamada a controlador con los datos
        await deletePedido({_id: req.query._id, sesion: req.user.id });

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

router.get("/", middlewareAutenticacion, GetPedidos);
router.post("/", middlewareAutenticacion, PostPedido);
router.patch("/", middlewareAutenticacion, PatchPedido);
router.delete("/", middlewareAutenticacion, DeletePedido);


module.exports = router;