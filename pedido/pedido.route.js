const express = require('express')
const router = express.Router();
const { readPedidoConFiltros, createPedido, updatePedido, deletePedido } = require("./pedido.controller");
const { respondWithError } = require('../utils/functions');

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
        await createPedido(req.body);

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
        updatePedido(req.body);

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
        deletePedido(req.query._id);

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

router.get("/", GetPedidos);
router.post("/", PostPedido);
router.patch("/", PatchPedido);
router.delete("/", DeletePedido);


module.exports = router;