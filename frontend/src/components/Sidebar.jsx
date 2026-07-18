import {
    Link
} from "react-router-dom";


import {
    FaHome,
    FaUsers,
    FaBuilding,
    FaCar,
    FaClipboardList,
    FaCreditCard,
    FaPlus,
    FaList
} from "react-icons/fa";


import {
    useAuth
} from "../context/AuthContext";


import "../styles/Sidebar.css";



export default function Sidebar({
    abierto
}){


const {
    usuario
}=useAuth();



const rol=usuario?.rol;



return (


<aside

className={
    abierto
    ?
    "sidebar"
    :
    "sidebar cerrado"
}


>



<div className="logo">

Control Vehicular

</div>



<div className="perfil">


<div className="avatar">

👤

</div>



<div className="datos">


<strong>
{usuario?.nombre}
</strong>


<small>
{rol}
</small>


</div>


</div>





<nav>



<Link to="/dashboard">

<FaHome/>

<span>
Dashboard
</span>

</Link>




{
rol==="Superusuario" &&

<>


<Link to="/usuarios">

<FaUsers/>

<span>
Usuarios
</span>

</Link>



<Link to="/empresas">

<FaBuilding/>

<span>
Empresas
</span>

</Link>


</>


}





{
(rol==="Administrador" ||
rol==="Superusuario")
&&

<>


<Link to="/unidades">

<FaCar/>

<span>
Unidades
</span>

</Link>



<Link to="/asignaciones">

<FaList/>

<span>
Asignaciones
</span>

</Link>


</>


}




{
rol==="Contabilidad" &&

<>


<Link to="/solicitudes">

<FaClipboardList/>

<span>
Solicitudes
</span>

</Link>




<Link to="/creditos">

<FaCreditCard/>

<span>
Créditos
</span>

</Link>


</>


}





{
rol==="Conductor" &&

<>


<Link to="/solicitudes/nueva">

<FaPlus/>

<span>
Nueva solicitud
</span>

</Link>




<Link to="/mis-solicitudes">

<FaList/>

<span>
Mis solicitudes
</span>

</Link>


</>


}



</nav>


</aside>


);


}