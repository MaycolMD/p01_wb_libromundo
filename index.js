const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
     res.status(200).json({});
})

const rutasUsuario = require("./usuario/usuario.route")
app.use('/usuario', rutasUsuario);

const rutasPedido = require("./pedido/pedido.route")
app.use('/pedido', rutasPedido);

const rutasLibro = require("./libro/libro.route")
app.use('/libro', rutasLibro);

// aqui va la connection string VVVVV
const MONGO_DB_USER = process.env.MONGO_DB_USER;
const MONGO_DB_PASSWORD = process.env.MONGO_DB_PASSWORD;

const MONGO_DB_URL = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.owq70z3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'`;

mongoose.connect(MONGO_DB_URL);

app.listen(8080);

