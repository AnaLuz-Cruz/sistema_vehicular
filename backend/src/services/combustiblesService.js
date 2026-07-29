import {
    findAll
} from "../repositories/combustiblesRepository.js";

const getCombustibles = async () => {

    return await findAll();

};

export {
    getCombustibles
};