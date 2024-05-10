const express = require('express')
const router = express.Router();
const { readLibroConFiltros, createLibro, updateLibro, deleteLibro } = require("./libro.controller");
const { respondWithError } = require('../utils/functions');

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
        await createLibro(req.body);

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
        updateLibro(req.body);

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
        deleteLibro(req.query._id);

        res.status(200).json({
            mensaje: "Exito. 👍"
        })
    } catch(e) {
        respondWithError(res, e);
    }
}

router.get("/", GetLibros);
router.post("/", PostLibro);
router.patch("/", PatchLibro);
router.delete("/", DeleteLibro);


module.exports = router;