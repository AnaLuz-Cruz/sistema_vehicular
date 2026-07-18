import prestamosService from "../services/prestamosService.js";



/*
|--------------------------------------------------------------------------
| Crear préstamo
|--------------------------------------------------------------------------
*/

const create = async(req,res)=>{


    try{


        const prestamo =
            await prestamosService.create(
                req.body
            );



        return res.status(201).json({

            success:true,

            message:"Solicitud de préstamo creada correctamente",

            data:prestamo

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


        const prestamos =
            await prestamosService.findAll();



        return res.status(200).json({

            success:true,

            data:prestamos

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



        const prestamo =
            await prestamosService.findById(id);



        return res.status(200).json({

            success:true,

            data:prestamo

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
| Actualizar préstamo
|--------------------------------------------------------------------------
*/

const update = async(req,res)=>{


    try{


        const {id}=req.params;



        const prestamo =
            await prestamosService.update(
                id,
                req.body
            );



        return res.status(200).json({

            success:true,

            message:"Préstamo actualizado correctamente",

            data:prestamo

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



        const prestamo =
            await prestamosService.updateStatus(
                id,
                estado
            );



        return res.status(200).json({

            success:true,

            message:"Estado actualizado correctamente",

            data:prestamo

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