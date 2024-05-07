const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

console.log('hello world')

// app.get("/", (req,res) => {
//     res.status(200).json({});
// })

// const rutasProducto = require("./producto/producto.route")
// app.use('/producto', rutasProducto);


// // aqui va la connection string VVVVV
// mongoose.connect('mongodb://127.0.0.1:27017/myapp');

app.listen(8080);

