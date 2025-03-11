import React, { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import APIURL from '../../utils/apiurl';
import AuthContext from '../../context/Authcontext';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const { loginMutation } = useContext(AuthContext);
  // Mutation pour la connexion
//   const loginMutation = useMutation({
//     mutationFn: async (formData) => {
//       const response = await axios.post(`${APIURL}/token/`, formData);
//       return response.data;
//     },
//     onSuccess: (data) => {
//       localStorage.setItem('token', data.token); // Exemple de stockage du token
//       alert('Connexion réussie !');
//       navigate('/dashboard'); 
//     },
//     onError: (error) => {
//       alert(`Erreur lors de la connexion : ${error.message}`);
//     },
//   });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData); // Soumettez les données du formulaire
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
      {/* Card pour le formulaire */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full space-y-6">
        {/* Logo */}
        <div className="text-center">
          <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          janguXayma
          </span>
          <p className="mt-2 text-gray-600">Connectez-vous pour accéder à votre compte 🔐</p>
        </div>

        {/* Formulaire de connexion */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Champ Email */}
          <div>
            <label className="w-full input input-bordered input-secondary flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
                name="email"
                className="grow"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          {/* Champ Mot de passe */}
          <div>
            <label className="w-full input input-bordered input-primary flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                name="password"
                className="grow"
                placeholder="Mot de passe"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          {/* Bouton de connexion */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 px-4 rounded-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'Chargement...' : 'Se connecter'}
            </button>
          </div>
        </form>

        {/* Lien vers la page d'inscription */}
        <p className="text-sm text-gray-600 text-center">
          Vous n'avez pas de compte ?{' '}
          <Link to="/register" className="cursor-pointer text-blue-600 hover:text-blue-500">
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;