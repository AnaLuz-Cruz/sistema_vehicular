import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
    Outlet
} from "react-router-dom";

import {
    useState
} from "react";

import "../styles/Layout.css";


export default function DashboardLayout(){


    const [sidebarAbierto,setSidebarAbierto] = useState(true);



    return (

        <div 
        className={
            sidebarAbierto 
            ? "layout"
            : "layout sidebar-cerrado"
        }
        >



            <Sidebar 
                abierto={sidebarAbierto}
            />



            <div className="contenido">


                <Navbar

                    cambiarSidebar={
                        ()=>setSidebarAbierto(
                            !sidebarAbierto
                        )
                    }

                />



                <main className="pagina">

                    <Outlet/>

                </main>



            </div>


        </div>

    );

}