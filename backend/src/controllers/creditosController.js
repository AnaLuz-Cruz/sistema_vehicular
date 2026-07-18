import creditosService from "../services/creditosService.js";



/*
|--------------------------------------------------------------------------
| Crear crédito
|--------------------------------------------------------------------------
*/

const create = async(req,res)=>{


    try{


        const credito =
            await creditosService.create(req.body);



        return res.status(201).json({

            success:true,

            message:"Crédito registrado correctamente",

            data:credito

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
| Obtener todos
|--------------------------------------------------------------------------
*/

const findAll = async(req,res)=>{


    try{


        const creditos =
            await creditosService.findAll();



        return res.status(200).json({

            success:true,

            data:creditos

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



        const credito =
            await creditosService.findById(id);



        return res.status(200).json({

            success:true,

            data:credito

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



        const credito =
            await creditosService.update(
                id,
                req.body
            );



        return res.status(200).json({

            success:true,

            message:"Crédito actualizado correctamente",

            data:credito

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
| Cambiar estado
|--------------------------------------------------------------------------
*/

const updateStatus = async(req,res)=>{


    try{


        const {id}=req.params;


        const {estado}=req.body;



        const credito =
            await creditosService.updateStatus(
                id,
                estado
            );



        return res.status(200).json({

            success:true,

            message:"Estado actualizado correctamente",

            data:credito

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
    update,
    updateStatus

};