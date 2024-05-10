const Pedido = require("./pedido.model")

async function getPedidoMongo(filtros) {
    const cantidadPedidos = await Pedido.countDocuments(filtros);
    const PedidosFiltrados = await Pedido.find(filtros);

    return {
        resultados: PedidosFiltrados,
        // paginaMax: cantidadPedidos / 20,
        // paginaActual: 1,
        cantidadPedidos: cantidadPedidos
    };
}

async function createPedidoMongo(datos) {
    const PedidoCreado = await Pedido.create(datos);

    return PedidoCreado;
}

async function updatePedidoMongo(_id, cambios) {
    const resultado = await Pedido.findOneAndUpdate({_id}, cambios);

    return resultado
}

async function deletePedidoMongo(_id) {
    const resultado = await Pedido.findOneAndUpdate({_id}, { visible: false });
    
    return resultado;
}

module.exports = {
    createPedidoMongo,
    getPedidoMongo,
    updatePedidoMongo,
    deletePedidoMongo
};