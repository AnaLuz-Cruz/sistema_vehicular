import {
    Link,
    useLocation
} from "react-router-dom";


import {
    FaHome,
    FaUsers,
    FaBuilding,
    FaCar,
    FaClipboardList,
    FaCreditCard,
    FaList,
    FaGasPump,
    FaMoneyCheckAlt,
    FaExchangeAlt
} from "react-icons/fa";


import {
    useAuth
} from "../context/AuthContext";


import "../styles/Sidebar.css";



export default function Sidebar({abierto}){


const {
    usuario
}=useAuth();


const rol = usuario?.rol;

const location = useLocation();



const linkActivo=(ruta)=>{

    return location.pathname===ruta
    ?
    "active"
    :
    "";

};




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

    <img 
        src="/logo1.png"
        alt="Control Vehicular"
    />

</div>



<div className="perfil">


    <div className="avatar">

        <img 
            src="/nino.png"
            alt="Usuario"
        />

    </div>



    <div className="datos">


        <strong>
            {usuario?.nombre}
        </strong>

        <br></br>

        <small>
            {rol}
        </small>


    </div>


</div>




<nav>



<Link 
to="/dashboard"
className={linkActivo("/dashboard")}
>

<FaHome/>

<span>
Dashboard
</span>

</Link>







{/* ================================
        SUPERUSUARIO
     ================================ */}


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



<Link to="/sucursales">
<FaBuilding/>
<span>
Sucursales
</span>
</Link>



<Link to="/areas">
<FaList/>
<span>
Áreas
</span>
</Link>



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



<Link to="/placas">
<FaCar/>
<span>
Placas
</span>
</Link>



<Link to="/creditos">
<FaCreditCard/>
<span>
Créditos
</span>
</Link>



<Link to="/transferencias">
<FaExchangeAlt/>
<span>
Transferencias
</span>
</Link>



<Link to="/prestamos">
<FaCar/>
<span>
Préstamos
</span>
</Link>



<Link to="/solicitudes">
<FaClipboardList/>
<span>
Solicitudes
</span>
</Link>


</>

}









{/* ================================
        ADMINISTRADOR
     ================================ */}



{
rol==="Administrador" &&

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



<Link to="/placas">
<FaCar/>
<span>
Placas
</span>
</Link>



<Link to="/prestamos">
<FaCar/>
<span>
Préstamos
</span>
</Link>


</>

}









{/* ================================
        CONTABILIDAD
     ================================ */}


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



<Link to="/transferencias">
<FaMoneyCheckAlt/>
<span>
Transferencias
</span>
</Link>



<Link to="/tickets">
<FaGasPump/>
<span>
Tickets
</span>
</Link>


</>

}









{/* ================================
        CONDUCTOR
     ================================ */}


{
rol==="Conductor" &&

<>

<Link to="/solicitudes/nueva">

<FaClipboardList/>

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