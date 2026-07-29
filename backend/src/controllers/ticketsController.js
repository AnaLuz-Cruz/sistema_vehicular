import ticketsService from "../services/ticketsService.js";

/*
|--------------------------------------------------------------------------
| Crear Ticket
|--------------------------------------------------------------------------
*/

const create = async (req, res) => {

    try {

        const ticket = await ticketsService.create(req.body);

        return res.status(201).json({

            success: true,

            message: "Ticket registrado correctamente.",

            data: ticket

        });

    } catch (error) {

        return res.status(400).json({

            success: false,

            message: error.message

        });

    }

};

const findAll = async(req,res)=>{

    try{

        const tickets =
            await ticketsService.findAll();

        return res.status(200).json({

            success:true,
            data:tickets

        });

    }catch(error){

        return res.status(500).json({

            success:false,
            message:error.message

        });

    }

};



const findById = async(req,res)=>{

    try{

        const {id}=req.params;

        const ticket =
            await ticketsService.findById(id);


        return res.status(200).json({

            success:true,
            data:ticket

        });


    }catch(error){

        return res.status(404).json({

            success:false,
            message:error.message

        });

    }

};


export default {
    create,
    findAll,
    findById
};