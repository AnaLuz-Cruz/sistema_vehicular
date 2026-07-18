import transferenciasService from "../services/transferenciasService.js";



/*
|--------------------------------------------------------------------------
| Crear transferencia
|--------------------------------------------------------------------------
*/

const create = async(req,res)=>{


    try{


        const transferencia =
            await transferenciasService.create(req.body);



        return res.status(201).json({

            success:true,

            message:"Gasolinera registrada correctamente",

            data:transferencia

        });



    }catch(error){


        return res.status(400).json({

            success:false,

            message:error.message

        });


    }


};







/*
|--------------------------------------------------------------------------
| Obtener todas
|--------------------------------------------------------------------------
*/

const findAll = async(req,res)=>{


    try{


        const transferencias =
            await transferenciasService.findAll();



        return res.status(200).json({

            success:true,

            data:transferencias

        });



    }catch(error){


        return res.status(500).json({

            success:false,

            message:error.message

        });


    }


};







/*
|--------------------------------------------------------------------------
| Obtener por ID
|--------------------------------------------------------------------------
*/

const findById = async(req,res)=>{


    try{


        const {id}=req.params;



        const transferencia =
            await transferenciasService.findById(id);



        return res.status(200).json({

            success:true,

            data:transferencia

        });



    }catch(error){


        return res.status(404).json({

            success:false,

            message:error.message

        });


    }


};







/*
|--------------------------------------------------------------------------
| Actualizar
|--------------------------------------------------------------------------
*/

const update = async(req,res)=>{


    try{


        const {id}=req.params;



        const transferencia =
            await transferenciasService.update(
                id,
                req.body
            );



        return res.status(200).json({

            success:true,

            message:"Gasolinera actualizada correctamente",

            data:transferencia

        });



    }catch(error){


        return res.status(400).json({

            success:false,

            message:error.message

        });


    }


};

export default {


    create,
    findAll,
    findById,
    update

};