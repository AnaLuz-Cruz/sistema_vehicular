import api from "../api/axios";

export const obtenerAsignaciones = async () => {
    const response = await api.get("/asignaciones");
    return response.data.data;
};

export const obtenerAsignacion = async (id) => {
    const response = await api.get(`/asignaciones/${id}`);
    return response.data.data;
};

export const crearAsignacion = async (asignacion) => {
    const response = await api.post("/asignaciones", asignacion);
    return response.data;
};

export const actualizarAsignacion = async (id, asignacion) => {
    const response = await api.put(`/asignaciones/${id}`, asignacion);
    return response.data;
};

export const cambiarEstadoAsignacion = async (id, status) => {
    const response = await api.patch(
        `/asignaciones/${id}/status`,
        { status }
    );

    return response.data;
};