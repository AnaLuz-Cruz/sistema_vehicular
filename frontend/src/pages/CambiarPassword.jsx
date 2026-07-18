import {
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import api from "../api/axios";

import {
    useAuth
} from "../context/AuthContext";


export default function CambiarPassword(){


    const navigate = useNavigate();


    const {
        usuario,
        login
    } = useAuth();



    const [passwordNueva,setPasswordNueva] = useState("");

    const [confirmar,setConfirmar] = useState("");

    const [mensaje,setMensaje] = useState("");



    const cambiar = async(e)=>{


        e.preventDefault();


        if(passwordNueva !== confirmar){

            setMensaje(
                "Las contraseñas no coinciden."
            );

            return;

        }



        try{


            const respuesta =
            await api.post(
                "/auth/change-password",
                {

                    id_usuario:
                    usuario.id_usuario,

                    passwordNueva

                }
            );



            setMensaje(
                respuesta.data.message
            );



            login({

                ...usuario,

                must_change_password:0

            });



            setTimeout(()=>{

                navigate("/dashboard");

            },1500);



        }catch(error){


            setMensaje(
                error.response?.data?.message ||
                "Error al cambiar contraseña."
            );

        }


    };



    return (

        <div className="password-container">


            <div className="password-card"
            style={{
                maxWidth:"400px"
            }}>


                <div className="card-body">


                    <h3 className="password-subtitle">

                        Cambiar contraseña

                    </h3>


                    <p className="password-subtitle">

                        Debes actualizar tu contraseña temporal.

                    </p>



                    {
                    mensaje &&
                    <div className="password-message">

                        {mensaje}

                    </div>
                    }



                    <form onSubmit={cambiar}>


                        <input

                        type="password"

                        className=""

                        placeholder="Nueva contraseña"

                        value={passwordNueva}

                        onChange={
                            e=>setPasswordNueva(
                                e.target.value
                            )
                        }

                        required

                        />



                        <input

                        type="password"

                        className=""

                        placeholder="Confirmar contraseña"

                        value={confirmar}

                        onChange={
                            e=>setConfirmar(
                                e.target.value
                            )
                        }

                        required

                        />



                        <button

                        className="password-button"

                        >

                            Guardar contraseña

                        </button>



                    </form>


                </div>


            </div>


        </div>

    );

}