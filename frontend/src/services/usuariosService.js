import api from "../api/axios";

// Obtener todos
export const obtenerUsuarios = async () => {
    const response = await api.get("/usuarios");
    return response.data.data;
};

// Obtener uno
export const obtenerUsuario = async (id) => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data.data;
};

// Crear
export const crearUsuario = async (usuario) => {
    const response = await api.post("/usuarios", usuario);
    return response.data;
};

// Actualizar
export const actualizarUsuario = async (id, usuario) => {
    const response = await api.put(`/usuarios/${id}`, usuario);
    return response.data;
};

// Cambiar estado
export const cambiarEstadoUsuario = async (id, estado) => {
    const response = await api.patch(`/usuarios/${id}/estado`, {
        estado,
    });

    return response.data;
};

