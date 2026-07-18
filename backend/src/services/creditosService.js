import creditosRepository from "../repositories/creditosRepository.js";


/*
|--------------------------------------------------------------------------
| Crear crédito
|--------------------------------------------------------------------------
*/

const create = async (data) => {


    /*
    |--------------------------------------------------------------------------
    | Validaciones básicas
    |--------------------------------------------------------------------------
    */


    if(!data.nombre_credito){

        throw new Error(
            "El nombre del crédito es obligatorio"
        );

    }



    if(
        data.limite_credito !== undefined &&
        data.limite_credito < 0
    ){

        throw new Error(
            "El límite de crédito no puede ser negativo"
        );

    }




    /*
    |--------------------------------------------------------------------------
    | Validar nombre duplicado
    |--------------------------------------------------------------------------
    */


    const creditoExistente =
        await creditosRepository.findByNombre(
            data.nombre_credito
        );



    if(creditoExistente){

        throw new Error(
            "Ya existe un crédito con ese nombre"
        );

    }




    return await creditosRepository.create(data);


};





/*
|--------------------------------------------------------------------------
| Obtener todos
|--------------------------------------------------------------------------
*/

const findAll = async()=>{


    return await creditosRepository.findAll();


};





/*
|--------------------------------------------------------------------------
| Obtener por ID
|--------------------------------------------------------------------------
*/

const findById = async(id)=>{


    const credito =
        await creditosRepository.findById(id);



    if(!credito){

        throw new Error(
            "El crédito no existe"
        );

    }



    return credito;


};







/*
|--------------------------------------------------------------------------
| Actualizar
|--------------------------------------------------------------------------
*/

const update = async(id,data)=>{


    const credito =
        await creditosRepository.findById(id);



    if(!credito){

        throw new Error(
            "El crédito no existe"
        );

    }





    /*
    Validar nombre duplicado
    */


    if(data.nombre_credito){


        const existe =
            await creditosRepository.findByNombre(
                data.nombre_credito
            );



        if(
            existe &&
            existe.id_credito !== Number(id)
        ){

            throw new Error(
                "Ya existe otro crédito con ese nombre"
            );

        }


    }





    if(
        data.limite_credito !== undefined &&
        data.limite_credito < 0
    ){

        throw new Error(
            "El límite de crédito no puede ser negativo"
        );

    }




    return await creditosRepository.update(
        id,
        data
    );


};







/*
|--------------------------------------------------------------------------
| Cambiar estado
|--------------------------------------------------------------------------
*/

const updateStatus = async(id,estado)=>{


    const estadosValidos=[

        0,
        1

    ];



    if(!estadosValidos.includes(Number(estado))){


        throw new Error(
            "Estado inválido"
        );


    }




    const credito =
        await creditosRepository.findById(id);



    if(!credito){


        throw new Error(
            "El crédito no existe"
        );


    }





    return await creditosRepository.updateStatus(
        id,
        estado
    );


};

export default {


    create,
    findAll,
    findById,
    update,
    updateStatus

};