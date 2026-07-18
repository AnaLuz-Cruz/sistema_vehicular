import transferenciasRepository from "../repositories/transferenciasRepository.js";



/*
|--------------------------------------------------------------------------
| Crear transferencia
|--------------------------------------------------------------------------
*/

const create = async(data)=>{


    /*
    |--------------------------------------------------------------------------
    | Validar nombre obligatorio
    |--------------------------------------------------------------------------
    */

    if(!data.nombre_gasolinera){

        throw new Error(
            "El nombre de la gasolinera es obligatorio"
        );

    }



    /*
    |--------------------------------------------------------------------------
    | Validar duplicado
    |--------------------------------------------------------------------------
    */

    const existe =
        await transferenciasRepository.findByNombre(
            data.nombre_gasolinera
        );



    if(existe){

        throw new Error(
            "La gasolinera ya está registrada"
        );

    }



    return await transferenciasRepository.create(data);


};







/*
|--------------------------------------------------------------------------
| Obtener todas
|--------------------------------------------------------------------------
*/

const findAll = async()=>{


    return await transferenciasRepository.findAll();


};








/*
|--------------------------------------------------------------------------
| Obtener por ID
|--------------------------------------------------------------------------
*/

const findById = async(id)=>{


    const transferencia =
        await transferenciasRepository.findById(id);



    if(!transferencia){


        throw new Error(
            "La gasolinera no existe"
        );


    }



    return transferencia;


};








/*
|--------------------------------------------------------------------------
| Actualizar
|--------------------------------------------------------------------------
*/

const update = async(id,data)=>{


    const transferencia =
        await transferenciasRepository.findById(id);



    if(!transferencia){


        throw new Error(
            "La gasolinera no existe"
        );


    }





    if(!data.nombre_gasolinera){


        throw new Error(
            "El nombre de la gasolinera es obligatorio"
        );


    }







    const existe =
        await transferenciasRepository.findByNombre(
            data.nombre_gasolinera
        );



    if(
        existe &&
        existe.id_transferencia !== Number(id)
    ){


        throw new Error(
            "Ya existe otra gasolinera con ese nombre"
        );


    }





    return await transferenciasRepository.update(
        id,
        data
    );


};






export default {


    create,
    findAll,
    findById,
    update

};