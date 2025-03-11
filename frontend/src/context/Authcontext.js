import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import swal from "sweetalert2";
import APIURL from '../utils/apiurl';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mutation pour la connexion
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axios.post(`${APIURL}/token/`, { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      setAuthTokens(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/dashboard");
      swal.fire({
        title: "Login Success🚀✅",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      swal.fire({
        title: `Email ou Password incorrect❌ ${error}`,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    },
  });

  // Mutation pour l'inscription
  const registerMutation = useMutation({
    mutationFn: async ({ username,email,role, password, confirm_password }) => {
      const response = await axios.post(`${APIURL}/register/`, {
        email,
        username,
        role,
        password,
        confirm_password,
      });
      return response.data;
    },
    onSuccess: () => {
      navigate("/login");
      swal.fire({
        title: "Registration Success🚀",
        icon: "success",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      let messageError = "Une erreur est survenue";
      if(error.response && error.response.data){
        if(typeof error.response.data === "string"){
          messageError = error.response.data;
        }else if(typeof error.response.data === "object"){
          messageError = Object.values(error.response.data).flat().join("\n");
        }
      }
      swal.fire({
        title: `Erreur lors de l'inscription❌ ${messageError}`,
        icon: "error",
        toast: true,
        timer: 6000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    },
  });

  // Fonction de déconnexion
  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/login");
    swal.fire({
      title: "You have been logged out🫡",
      icon: "success",
      toast: true,
      timer: 6000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  // Données du contexte
  const contextData = {
    user,
    setUser,
    authTokens,
    setAuthTokens,
    loginMutation,
    registerMutation,
    logoutUser,
  };

  // Effet pour décoder le token au chargement
  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode(authTokens.access));
    }
    setLoading(false);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};