const mongoose = require("mongoose");

const schemaUsuario = new mongoose.Schema({

    identificacion: {type: Number, required: true, unique: true, inmutable: true},
    nombres: {type: String, required: true},
    apellidos: {type: String, required: true},
    telefono: {type: String, required: false},
    email: {type: String, required: true},
    password: {type: String, required: true},
    visible: {type: Boolean, required: true},

  }, {
    versionKey: false,
    timestamps: true
});
   
const Model = mongoose.model('Usuario', schemaUsuario);

module.exports = Model;