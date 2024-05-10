const { throwCustomError } = require("../utils/functions");
const { createPedidoMongo, getPedidoMongo, updatePedidoMongo, deletePedidoMongo } = require("./Pedido.actions");
const { getLibroMongo, deleteLibroMongo } = require("./../libro/libro.actions");

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

    const libros = datos.libros;

    if (!libros || libros.length === 0) {
        throwCustomError(400, "La lista de libros está vacía");
    }

    const primerLibro = (await getLibroMongo({ _id: libros[0], visible: true })).resultados[0];
    const propietarioPrimerLibro = primerLibro.propietario;

    for (let i = 1; i < libros.length; i++) {
        const libro = (await getLibroMongo({ _id: libros[i], visible: true })).resultados[0];
        if (libro.propietario !== propietarioPrimerLibro) {
            throwCustomError(400, "No todos los libros pertenecen al mismo propietario");
        }
    }

    const PedidoCreado = await createPedidoMongo({ ...datos, vendedor: propietarioPrimerLibro, estado: 'en progreso' });
    return PedidoCreado;

}

async function updatePedido(datos) {
    const { _id, estado, sesion, ...cambios } = datos;

    const otrosCambios = Object.keys(cambios).length > 0;

    if (otrosCambios) {
        throwCustomError(501, "Solo se puede cambiar el estado del pedido.");
    }

    const pedido = (await getPedidoMongo({ _id, visible: true })).resultados[0];

    if (sesion === pedido.comprador) {

        if (pedido.estado == 'en progreso' && estado == 'cancelado') {
            const PedidoActualizado = updatePedidoMongo(_id, { estado });

            return PedidoActualizado;
        }

        throwCustomError(501, "No puedes hacer esta acción");
    }

    if (sesion === pedido.vendedor) {

        if (pedido.estado == 'en progreso' && (estado == 'completado' || estado == 'cancelado')) {
            const PedidoActualizado = updatePedidoMongo(_id, { estado });

            if (estado == 'completado') {

                const libros = pedido.libros;

                for (let i = 0; i < libros.length; i++) {
                    const libro = (await deleteLibroMongo({ _id: libros[i], visible: true}));
                }

            }

            return PedidoActualizado;
        }

        throwCustomError(501, "No puedes hacer esta acción");
    }

    throwCustomError(501, "Este pedido no es tuyo");

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