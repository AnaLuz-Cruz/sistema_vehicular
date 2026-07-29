import {
    useEffect,
    useState
} from "react";


import {
    obtenerSucursales,
    obtenerSucursal,
    crearSucursal,
    actualizarSucursal,
    cambiarEstadoSucursal
} from "../services/sucursalesService";


import {
    obtenerEmpresas
} from "../services/empresasService";


import TablaSucursales
from "../components/sucursales/TablaSucursales";


import FormularioSucursal
from "../components/sucursales/FormularioSucursal";



export default function AdministrarSucursales(){


    const [
        sucursales,
        setSucursales
    ] = useState([]);



    const [
        empresas,
        setEmpresas
    ] = useState([]);



    const [
        mostrarFormulario,
        setMostrarFormulario
    ] = useState(false);



    const [
        sucursalEditar,
        setSucursalEditar
    ] = useState(null);




    const cargarDatos = async()=>{


        try{


            const [
                sucursalesData,
                empresasData

            ] = await Promise.all([


                obtenerSucursales(),

                obtenerEmpresas()


            ]);



            setSucursales(
                sucursalesData
            );


            setEmpresas(
                empresasData
            );



        }catch(error){

            console.error(error);

        }


    };





    useEffect(()=>{


        cargarDatos();


    },[]);






    const guardarSucursal = async(sucursal)=>{


        try{


            await crearSucursal(
                sucursal
            );


            await cargarDatos();


            setMostrarFormulario(false);



        }catch(error){

            console.error(error);

        }


    };







    const editarSucursal = async(id)=>{


        try{


            const sucursal =
                await obtenerSucursal(id);



            setSucursalEditar(
                sucursal
            );


            setMostrarFormulario(
                true
            );



        }catch(error){

            console.error(error);

        }


    };






    const actualizarDatosSucursal = async(sucursal)=>{


        try{


            await actualizarSucursal(

                sucursalEditar.id_sucursal,

                sucursal

            );



            await cargarDatos();



            setSucursalEditar(null);


            setMostrarFormulario(false);



        }catch(error){

            console.error(error);

        }


    };







    const cambiarEstado = async(
        id,
        estado
    )=>{


        try{


            await cambiarEstadoSucursal(
                id,
                estado
            );


            cargarDatos();



        }catch(error){

            console.error(error);

        }


    };






    return(

        <div>


            <h1>
                Administrar Sucursales
            </h1>




            {

                mostrarFormulario

                ?

                <FormularioSucursal

                    sucursal={sucursalEditar}

                    empresas={empresas}


                    onGuardar={
                        sucursalEditar
                        ?
                        actualizarDatosSucursal
                        :
                        guardarSucursal
                    }


                    onCancelar={()=>{

                        setSucursalEditar(null);

                        setMostrarFormulario(false);

                    }}


                />


                :


                <button

                    onClick={()=>{

                        setSucursalEditar(null);

                        setMostrarFormulario(true);

                    }}

                >

                    Nueva Sucursal

                </button>

            }




            <hr/>




            <TablaSucursales

                sucursales={sucursales}

                onEditar={editarSucursal}

                onEstado={cambiarEstado}

            />



        </div>


    );

}