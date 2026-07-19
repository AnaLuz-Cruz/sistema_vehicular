import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/MainLayout.css";


export default function Layout({children}) {

    return (

        <div className="layout">


            <Sidebar />


            <div className="contenido">


                <Navbar />


                <main className="pagina">

                    {children}

                </main>


            </div>


        </div>

    );

}