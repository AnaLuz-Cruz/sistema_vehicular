import api from "../api/axios";

// Obtener todas
export const obtenerPlacas = async () => {

    const response = await api.get("/placas");

    return response.data.data;

};

// Obtener una
export const obtenerPlaca = async (id) => {

    const response = await api.get(`/placas/${id}`);

    return response.data.data;

};

// Crear
export const crearPlaca = async (placa) => {

    const response = await api.post(
        "/placas",
        placa
    );

    return response.data;

};

// Actualizar
export const actualizarPlaca = async (
    id,
    placa
) => {

    const response = await api.put(
        `/placas/${id}`,
        placa
    );

    return response.data;

};

// Cambiar estado
export const cambiarEstadoPlaca = async (
    id,
    status
) => {

    const response = await api.patch(
        `/placas/${id}/status`,
        {
            status
        }
    );

    return response.data;

};