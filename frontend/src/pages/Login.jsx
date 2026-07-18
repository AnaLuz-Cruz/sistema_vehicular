import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

import "../styles/Login.css";


export default function Login() {


    const {
        login: guardarSesion
    } = useAuth();



    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");



    const navigate = useNavigate();




    const ingresar = async (e) => {


        e.preventDefault();


        setError("");



        try {


            console.log("Datos enviados:", {
                login: usuario,
                password
            });



            const respuesta = await api.post(

                "/auth/login",

                {
                    login: usuario,
                    password
                }

            );



            const datos = respuesta.data.data;



            guardarSesion(
                datos.user
            );



            localStorage.setItem(
                "token",
                datos.token
            );



            if(datos.user.must_change_password === 1){


                navigate("/cambiar-password");


            }else{


                navigate("/dashboard");


            }



        } catch(error) {


            console.log(error);



            setError(

                error.response?.data?.message ||

                "Error al iniciar sesión"

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

                    Control Vehicular

                </h2>



                <p className="login-subtitle">

                    Sistema de control de combustible

                </p>



                {
                    error &&

                    <div className="login-error">

                        {error}

                    </div>

                }




                <form onSubmit={ingresar}>


                    <input

                        type="text"

                        placeholder="Usuario o correo"

                        value={usuario}

                        onChange={
                            e =>
                            setUsuario(
                                e.target.value
                            )
                        }

                        required

                    />





                    <input

                        type="password"

                        placeholder="Contraseña"

                        value={password}

                        onChange={
                            e =>
                            setPassword(
                                e.target.value
                            )
                        }

                        required

                    />

                    <div className="recuperacion">

                        <button
                            type="button"
                            className="recuperar-boton"
                            onClick={() => navigate("/recuperar")}
                        >

                            ¿Olvidaste tu contraseña?

                        </button>

                    </div>                    




                    <button

                        type="submit"

                    >

                        Ingresar

                    </button>



                </form>



            </div>



        </div>


    );


}