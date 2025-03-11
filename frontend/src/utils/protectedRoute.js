import { useContext } from "react";
import AuthContext from "../context/Authcontext";
import { Navigate } from "react-router-dom";
import swal from "sweetalert2";

const ProtectedRoute = ({children}) => {
    let {user} = useContext(AuthContext)

    if (!user){
        swal.fire({
            title: "Vous devez vous connectez❌",
            icon: "error",
            toast: true,
            timer: 6000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
            });
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute