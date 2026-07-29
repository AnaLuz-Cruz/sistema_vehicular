import api from "../api/axios";

// Obtener todas
export const obtenerAreas = async () => {

    const response = await api.get("/areas");

    return response.data.data;

};

// Obtener una
export const obtenerArea = async (id) => {

    const response = await api.get(`/areas/${id}`);

    return response.data.data;

};

// Crear
export const crearArea = async (area) => {

    const response = await api.post(
        "/areas",
        area
    );

    return response.data;

};

// Actualizar
export const actualizarArea = async (
    id,
    area
) => {

    const response = await api.put(
        `/areas/${id}`,
        area
    );

    return response.data;

};

// Eliminar
export const eliminarArea = async (id) => {

    const response = await api.delete(
        `/areas/${id}`
    );

    return response.data;

};