import { useState } from "react";
import api from "../api/axios";

import "../styles/Login.css";
import { Link } from "react-router-dom";


export default function RecuperarPassword(){


    const [correo,setCorreo] = useState("");

    const [mensaje,setMensaje] = useState("");

    const [error,setError] = useState("");



    const enviarSolicitud = async(e)=>{


        e.preventDefault();

        setMensaje("");
        setError("");



        try{


            const respuesta = await api.post(

                "/auth/forgot-password",

                {
                    correo
                }

            );


            setMensaje(
                respuesta.data.message
            );


        }catch(error){


            setError(

                error.response?.data?.message ||

                "Error al enviar solicitud"

            );


        }


    };



    return (

        <div className="login-container">


            <div className="login-card">


                <img

                src="/logo1.png"

                className="login-logo"

                alt="Logo"

                />


                <h2>
                    Recuperar contraseña
                </h2>



                <p>
                    Ingresa tu correo registrado
                </p>



                {
                    mensaje &&

                    <div className="login-success">

                        {mensaje}

                    </div>

                }



                {
                    error &&

                    <div className="login-error">

                        {error}

                    </div>

                }



                <form onSubmit={enviarSolicitud}>


                    <input

                    type="email"

                    placeholder="Correo electrónico"

                    value={correo}

                    onChange={
                        e=>setCorreo(e.target.value)
                    }

                    required

                    />



                    <button type="submit">

                        Enviar nueva contraseña

                    </button>

                <div className="mt-3 text-center">

                    <Link
                        to="/"
                        className="btn btn-outline-secondary w-100"
                    >
                        ← Volver al inicio de sesión
                    </Link>

                </div>

                </form>


            </div>



        </div>

    );

}