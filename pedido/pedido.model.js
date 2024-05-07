const mongoose = require("mongoose");

const schemaPedido = new mongoose.Schema({
    
    id: {type: Number, required: false},
    comprador: {type: String, required: true},
    vendedor: {type: String, required: true},
    libro: {type: String, required: true},
    fecha_creacion: {type: Date, required: true},
    estado: {type: String, required: true},
    visible: {type: Boolean, required: true},

  }, {
    versionKey: false,
    timestamps: true
});
   
const Model = mongoose.model('Pedido', schemaPedido);

module.exports = Model;