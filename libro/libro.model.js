const mongoose = require("mongoose")

const schemaLibro = new mongoose.Schema({
    
    nombre: {type: String, required: true},
    propietario: {type: Number, required: true},
    descripcion: {type: String, required: false},
    genero: {type: String, required: true},
    fecha_publicacion: {type: Date, required: true},
    casa_editorial: {type: String, required: true},
    autor: {type: String, required: true},
    precio: {type: Number, required: true},
    visible: {type: Boolean, required: true},

  }, {
    versionKey: false,
    timestamps: true
})
   
const Model = mongoose.model('Libro', schemaLibro)

module.exports = Model