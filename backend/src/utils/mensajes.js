export const mostrarError = (error) => {

    const mensaje =
        error.response?.data?.message ||
        error.message ||
        "Ocurrió un error inesperado.";

    alert(mensaje);

};

export const mostrarExito = (mensaje) => {

    alert(mensaje);

};

export const confirmar = (mensaje) => {

    return window.confirm(mensaje);

};