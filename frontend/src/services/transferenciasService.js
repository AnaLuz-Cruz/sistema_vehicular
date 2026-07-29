import api from "../api/axios";


// Obtener todas
export const obtenerTransferencias = async () => {

    const response = await api.get("/transferencias");

    return response.data.data;

};



// Obtener una
export const obtenerTransferencia = async (id) => {

    const response = await api.get(
        `/transferencias/${id}`
    );

    return response.data.data;

};



// Crear
export const crearTransferencia = async (transferencia) => {

    const response = await api.post(
        "/transferencias",
        transferencia
    );

    return response.data;

};



// Actualizar
export const actualizarTransferencia = async (
    id,
    transferencia
) => {

    const response = await api.put(
        `/transferencias/${id}`,
        transferencia
    );

    return response.data;

};