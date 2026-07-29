import api from "../api/axios";

// Obtener todos
export const obtenerCreditos = async () => {

    const response = await api.get("/creditos");

    return response.data.data;

};

// Obtener uno
export const obtenerCredito = async (id) => {

    const response = await api.get(`/creditos/${id}`);

    return response.data.data;

};

// Crear
export const crearCredito = async (credito) => {

    const response = await api.post(
        "/creditos",
        credito
    );

    return response.data;

};

// Actualizar
export const actualizarCredito = async (
    id,
    credito
) => {

    const response = await api.put(
        `/creditos/${id}`,
        credito
    );

    return response.data;

};

// Cambiar estado
export const cambiarEstadoCredito = async (
    id,
    estado
) => {

    const response = await api.patch(
        `/creditos/${id}/status`,
        {
            estado
        }
    );

    return response.data;

};