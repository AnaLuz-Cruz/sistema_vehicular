import {
    createContext,
    useContext,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(

        JSON.parse(
            localStorage.getItem("usuario")
        ) || null

    );

    const login = (datos) => {

        localStorage.setItem(
            "usuario",
            JSON.stringify(datos)
        );

        setUsuario(datos);

    };

    const logout = () => {

        localStorage.removeItem(
            "usuario"
        );

        localStorage.removeItem(
            "token"
        );

        setUsuario(null);

        navigate("/", {
            replace: true
        });

    };

    return (

        <AuthContext.Provider

            value={{

                usuario,

                login,

                logout

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(
        AuthContext
    );

}