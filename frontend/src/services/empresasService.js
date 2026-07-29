import api from "../api/axios";

// Obtener todas
export const obtenerEmpresas = async () => {

    const response = await api.get("/empresas");

    return response.data.data;

};

// Obtener una
export const obtenerEmpresa = async (id) => {

    const response = await api.get(`/empresas/${id}`);

    return response.data.data;

};

// Crear
export const crearEmpresa = async (empresa) => {

    const response = await api.post(
        "/empresas",
        empresa
    );

    return response.data;

};

// Actualizar
export const actualizarEmpresa = async (
    id,
    empresa
) => {

    const response = await api.put(
        `/empresas/${id}`,
        empresa
    );

    return response.data;

};

// Cambiar estado
export const cambiarEstadoEmpresa = async (
    id,
    estatus
) => {

    const response = await api.patch(
        `/empresas/${id}/estado`,
        {
            estatus
        }
    );

    return response.data;

};