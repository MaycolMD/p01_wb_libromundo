const { throwCustomError } = require("../utils/functions");
const { createPedidoMongo, getPedidoMongo, updatePedidoMongo, deletePedidoMongo } = require("./Pedido.actions");

async function readPedidoConFiltros(query) {
    if (!query.visible) {
        query.visible = true;
    }

    if (query.initialDate && query.finalDate) {
        const initialDate = new Date(query.initialDate);
        const finalDate = new Date(query.finalDate);

        finalDate.setDate(finalDate.getDate() + 1);

        query.fecha_creacion = { $gte: initialDate, $lt: finalDate };

        delete query.initialDate;
        delete query.finalDate;
    }

    const resultadosBusqueda = await getPedidoMongo(query);

    return resultadosBusqueda;
}

async function createPedido(datos) {
    
    datos.visible = true;

    const PedidoCreado = await createPedidoMongo(datos);
    return PedidoCreado;

}

function updatePedido(datos) {
    const { _id, estado, ...cambios } = datos;

    const otrosCambios = Object.keys(cambios).length > 0;

    if (otrosCambios) {
        throwCustomError(501, "Solo se puede cambiar el estado del pedido.");
    }

    const PedidoActualizado = updatePedidoMongo(_id, { estado });

    console.log(PedidoActualizado)

    return PedidoActualizado;
}


function deletePedido(id) {
    const PedidoOcultado = deletePedidoMongo(id);

    return PedidoOcultado;
}

module.exports = {
    readPedidoConFiltros,
    createPedido,
    updatePedido,
    deletePedido
}