import api from "../api/axios";

export const obtenerCombustibles = async () => {

    const response =
        await api.get("/combustibles");

    return response.data.data;

};
