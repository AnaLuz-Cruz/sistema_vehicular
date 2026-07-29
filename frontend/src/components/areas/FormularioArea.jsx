import { useEffect, useState } from "react";

export default function FormularioArea({

    area,

    onGuardar,

    onCancelar

}){

    const [nombre,setNombre] = useState("");



    useEffect(()=>{

        if(area){

            setNombre(area.nombre);

        }else{

            setNombre("");

        }

    },[area]);



    const enviar=(e)=>{

        e.preventDefault();

        onGuardar({

            nombre

        });

    };



    return(

        <form onSubmit={enviar}>

            <h2>

                {

                    area

                    ?

                    "Editar Área"

                    :

                    "Nueva Área"

                }

            </h2>

            <input

                value={nombre}

                onChange={(e)=>setNombre(e.target.value)}

                placeholder="Nombre del área"

            />

            <button>

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