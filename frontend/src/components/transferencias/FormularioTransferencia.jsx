import { useEffect, useState } from "react";


export default function FormularioTransferencia({

    transferencia,

    onGuardar,

    onCancelar

}) {


    const [formulario, setFormulario] = useState({

        nombre_gasolinera: ""

    });




    useEffect(() => {


        if(transferencia){


            setFormulario({

                nombre_gasolinera:

                    transferencia.nombre_gasolinera || ""

            });


        }


    },[transferencia]);







    const handleChange = (e)=>{


        const {name,value} = e.target;



        setFormulario({

            ...formulario,

            [name]: value

        });


    };







    const handleSubmit = (e)=>{


        e.preventDefault();


        onGuardar(formulario);


    };







    return (

        <form onSubmit={handleSubmit}>


            <h3>

                {

                    transferencia

                    ?

                    "Editar Gasolinera"

                    :

                    "Nueva Gasolinera"

                }

            </h3>





            <input

                type="text"

                name="nombre_gasolinera"

                placeholder="Nombre de gasolinera"

                value={formulario.nombre_gasolinera}

                onChange={handleChange}

                required

            />





            <button type="submit">

                Guardar

            </button>





            <button

                type="button"

                onClick={onCancelar}

            >

                Cancelar

            </button>



        </form>

    );

}