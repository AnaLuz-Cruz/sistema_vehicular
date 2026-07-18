import notificacionesRepository from "../repositories/notificacionesRepository.js";

/*
|--------------------------------------------------------------------------
| Crear notificación
|--------------------------------------------------------------------------
*/

const create = async (data) => {

    return await notificacionesRepository.create(data);

};

export default {

    create

};