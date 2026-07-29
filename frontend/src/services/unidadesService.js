import api from "../api/axios";

// Obtener todas
export const obtenerUnidades = async () => {

    const response = await api.get("/unidades");

    return response.data.data;

};

// Obtener una
export const obtenerUnidad = async (id) => {

    const response = await api.get(`/unidades/${id}`);

    return response.data.data;

};

// Crear
export const crearUnidad = async (unidad) => {

    const response = await api.post(
        "/unidades",
        unidad
    );

    return response.data;

};

// Actualizar
export const actualizarUnidad = async (
    id,
    unidad
) => {

    const response = await api.put(
        `/unidades/${id}`,
        unidad
    );

    return response.data;

};

// Cambiar estado
export const cambiarEstadoUnidad = async (
    id,
    estado
) => {

    const response = await api.patch(
        `/unidades/${id}/estado`,
        {
            estado
        }
    );

    return response.data;

};