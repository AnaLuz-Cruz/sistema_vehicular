import {
    useAuth
} from "../context/AuthContext";



export default function Dashboard(){


    const {
        usuario
    } = useAuth();



    return (

        <div>


            <h2>

                Bienvenido
                { " " }
                {usuario?.nombre}

            </h2>


            <hr/>


            <div className="card">

                <div className="card-body">


                    <h5>

                    Información del usuario

                    </h5>


                    <p>

                    Rol:
                    {usuario?.rol}

                    </p>



                    <p>

                    Usuario:
                    {usuario?.usuario}

                    </p>


                </div>

            </div>


        </div>

    );

}