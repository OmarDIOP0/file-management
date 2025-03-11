import React, { useContext, useState } from 'react';
import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import APIURL from '../../utils/apiurl';
import janguXayma from "../../assets/janguXayma.png";
import AuthContext from '../../context/Authcontext';

const Register = () => {
    const [formData,setFormDate] = useState({
        username:'',
        email:'',
        role:'',
        password:'',
        confirm_password:''
    });
    const navigate = useNavigate();
    const { registerMutation } = useContext(AuthContext);


    const handleSubmit  = (e) =>{
        e.preventDefault();
        console.log("Données envoyées :", formData);
        registerMutation.mutate(formData);
    }
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDate({
            ...formData,
            [name]: value
        });
    }
    return (
        <div className="min-h-screen flex flex-col lg:flex-row sm:flex-col overflow-hidden">
          {/* Partie gauche : Formulaire de connexion */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
            <div className="max-w-md w-full space-y-6">
              {/* Logo */}
              <div className="text-center">
                <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                janguXayma
                </span>
                <p className="mt-2 text-gray-600">Créer un compte en quelques clics 🚀</p>
              </div>
    
              {/* Formulaire de connexion */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Champ Name */}
                <div>
                  <label className="w-full input input-bordered input-info flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      type="text"
                      name="username"
                      className="grow"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
    
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
                {/* Champ Rôle */}
                <div>
                  <label className="w-full input input-bordered input-info flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="h-4 w-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <select
                      name="role"
                      className="grow bg-transparent focus:outline-none"
                      value={formData.role}
                      onChange={handleChange}
                      required
                    >
                      <option value="" disabled>Choisissez un rôle</option>
                      <option value="Student">Student</option>
                      <option value="Teacher">Teacher</option>
                    </select>
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
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
                  {/* Confirm Champ Mot de passe */}
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
                      name="confirm_password"
                      className="grow"
                      placeholder="Confirmer Password"
                      value={formData.confirm_password}
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
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? 'Chargement...' : 'Créer un compte'}
                  </button>
                </div>
              </form>
    
              {/* Lien vers la page de connexion */}
              <p className="text-sm text-gray-600 text-center">
                Avez-vous un compte ?{' '}
                <a href="/login" className="cursor-pointer text-blue-600 hover:text-blue-500">
                  Se connecter
                </a>
              </p>
            </div>
          </div>
    
          {/* Partie droite : Design coloré avec image et texte */}
          <div className="w-full lg:w-1/2 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center p-8">
            <div className="text-center text-white max-w-md">
              <h2 className="text-4xl font-bold mb-4">
                Bienvenue sur <span className="underline">janguXayma</span>
              </h2>
              <p className="text-lg mb-6">
                Une plateforme intelligente pour gerer nos exos avec AI.
              </p>
              <img
                src={janguXayma} alt="Jangu Xayma" // Assurez-vous que le chemin de l'image est correct
                className="w-9/12 h-auto rounded-lg shadow-2xl mx-auto"
              />
            </div>
          </div>
        </div>
      );
    };

export default Register;
