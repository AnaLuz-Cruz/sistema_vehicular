import api from "../api/axios";


// Obtener todos
export const obtenerPrestamos = async () => {

    const response = await api.get("/prestamos");

    return response.data.data;

};



// Obtener uno
export const obtenerPrestamo = async (id) => {

    const response = await api.get(
        `/prestamos/${id}`
    );

    return response.data.data;

};



// Crear
export const crearPrestamo = async (prestamo) => {

    const response = await api.post(
        "/prestamos",
        prestamo
    );

    return response.data;

};



// Actualizar
export const actualizarPrestamo = async (
    id,
    prestamo
) => {

    const response = await api.put(
        `/prestamos/${id}`,
        prestamo
    );

    return response.data;

};



// Cambiar estado
export const cambiarEstadoPrestamo = async (
    id,
    estado
) => {

    const response = await api.patch(
        `/prestamos/${id}/status`,
        {
            estado
        }
    );

    return response.data;

};