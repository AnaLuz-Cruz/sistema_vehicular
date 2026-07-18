import solicitudesService from "../services/solicitudesService.js";

/*
|--------------------------------------------------------------------------
| Crear solicitud
|--------------------------------------------------------------------------
*/

const create = async(req,res)=>{

    try{

        const solicitud =
            await solicitudesService.create(
                req.body
            );

        return res.status(201).json({

            success:true,
            message:"Solicitud creada correctamente",
            data: solicitud

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
| Obtener todas las solicitudes
|--------------------------------------------------------------------------
*/

const findAll = async(req,res)=>{

    try{

        const solicitudes =
            await solicitudesService.findAll();

        return res.status(200).json({

            success:true,
            data: solicitudes

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
| Obtener solicitud por ID
|--------------------------------------------------------------------------
*/

const findById = async(req,res)=>{


    try{

        const {id}=req.params;


        const solicitud =
            await solicitudesService.findById(id);

        return res.status(200).json({

            success:true,
            data: solicitud

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
| Actualizar estado
|--------------------------------------------------------------------------
*/

const updateStatus = async(req,res)=>{


    try{


        const {id}=req.params;

        const {
            estado,
            motivo_rechazo
        }=req.body;

        const resultado =
            await solicitudesService.updateStatus(
                id,
                estado,
                motivo_rechazo
            );

        return res.status(200).json({

            success:true,
            message:"Estado actualizado correctamente",
            data:resultado

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
    updateStatus
};