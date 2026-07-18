import {
    useNavigate
} from "react-router-dom";


import {
    FaBars
} from "react-icons/fa";


import {
    useAuth
} from "../context/AuthContext";


import "../styles/Navbar.css";



export default function Navbar({
    cambiarSidebar
}){


    const {
        usuario,
        logout

    } = useAuth();



    const navigate = useNavigate();



    const cerrarSesion =()=>{

        logout();

        navigate("/");

    };



return (


<header className="navbar">


<button
className="btn-menu"
onClick={cambiarSidebar}
>

<FaBars/>

</button>




<div className="usuario-menu">


<span>

{usuario?.nombre}

</span>



<span className="rol">

{usuario?.rol}

</span>



<button
className="btn-salir"
onClick={cerrarSesion}
>

Cerrar sesión

</button>


</div>



</header>


);


}