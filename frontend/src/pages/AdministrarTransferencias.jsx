import { useEffect, useState } from "react";

import {
    obtenerTransferencias,
    obtenerTransferencia,
    crearTransferencia,
    actualizarTransferencia
} from "../services/transferenciasService";

import FormularioTransferencia from "../components/transferencias/FormularioTransferencia";
import TablaTransferencias from "../components/transferencias/TablaTransferencias";


export default function AdministrarTransferencias() {


    const [transferencias, setTransferencias] = useState([]);

    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    const [transferenciaEditar, setTransferenciaEditar] = useState(null);

    const [buscar, setBuscar] = useState("");



    const cargarDatos = async () => {

        try {

            const data = await obtenerTransferencias();

            setTransferencias(data);

        } catch(error) {

            console.error(error);

        }

    };



    useEffect(() => {

        cargarDatos();

    }, []);





    const guardarTransferencia = async(datos)=>{


        try{


            await crearTransferencia(datos);


            await cargarDatos();


            setMostrarFormulario(false);



        }catch(error){


            console.error(error);


            alert(

                error.response?.data?.message ||

                "Error al guardar"

            );


        }


    };






    const editarTransferencia = async(id)=>{


        try{


            const transferencia =

                await obtenerTransferencia(id);



            setTransferenciaEditar(
                transferencia
            );


            setMostrarFormulario(true);



        }catch(error){


            console.error(error);


        }


    };






    const actualizarDatos = async(datos)=>{


        try{


            await actualizarTransferencia(

                transferenciaEditar.id_transferencia,

                datos

            );



            await cargarDatos();



            setTransferenciaEditar(null);


            setMostrarFormulario(false);



        }catch(error){


            console.error(error);


        }


    };







    const transferenciasFiltradas =

        transferencias.filter((transferencia)=>


            transferencia.nombre_gasolinera

            ?.toLowerCase()

            .includes(

                buscar.toLowerCase()

            )

        );






    return (

        <div>


            <h1>

                Administrar Transferencias

            </h1>




            <input

                type="text"

                placeholder="Buscar gasolinera..."

                value={buscar}

                onChange={(e)=>

                    setBuscar(e.target.value)

                }

            />





            {

                mostrarFormulario


                ?


                <FormularioTransferencia

                    transferencia={transferenciaEditar}


                    onGuardar={

                        transferenciaEditar

                        ?

                        actualizarDatos

                        :

                        guardarTransferencia

                    }


                    onCancelar={()=>{


                        setMostrarFormulario(false);


                        setTransferenciaEditar(null);


                    }}

                />


                :


                <button

                    onClick={()=>{


                        setTransferenciaEditar(null);


                        setMostrarFormulario(true);


                    }}

                >

                    Nueva Gasolinera

                </button>


            }






            <hr />





            <TablaTransferencias

                transferencias={transferenciasFiltradas}

                onEditar={editarTransferencia}

            />



        </div>

    );

}