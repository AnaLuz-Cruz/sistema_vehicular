import api from "../api/axios";


// Obtener todas
export const obtenerSucursales = async () => {

    const response =
        await api.get("/sucursales");

    return response.data.data;

};


// Obtener una
export const obtenerSucursal = async (id) => {

    const response =
        await api.get(`/sucursales/${id}`);

    return response.data.data;

};


// Crear
export const crearSucursal = async (sucursal) => {

    const response =
        await api.post(
            "/sucursales",
            sucursal
        );

    return response.data;

};


// Actualizar
export const actualizarSucursal = async (
    id,
    sucursal
) => {

    const response =
        await api.put(
            `/sucursales/${id}`,
            sucursal
        );

    return response.data;

};


// Cambiar estado
export const cambiarEstadoSucursal = async (
    id,
    estado
) => {

    const response =
        await api.patch(
            `/sucursales/${id}/estado`,
            {
                estado
            }
        );

    return response.data;

};