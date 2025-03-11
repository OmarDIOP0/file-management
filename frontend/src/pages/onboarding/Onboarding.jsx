import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import janguXayma from "../../assets/janguXayma.png";

const Onboarding = () => {
  const phrases = [
    'démarches administratives',
    'démarches administratives',
    'documents officiels',
    'processus bureaucratiques',
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  // Animation pour changer les phrases
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000);

    return () => clearInterval(interval); 
  }, [phrases.length]);

  return (
    <div className="bg-gray-50 w-full overflow-hidden">
      {/* Navbar */}
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <span className="space-x-1 text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            janguXayma
            </span>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-60 p-2 shadow"
            >
              <li>
                <a>Accueil</a>
              </li>
              <li>
                <a>Nos Services</a>
                <ul className="p-2">
                  <li>
                    <a>Demande de Document</a>
                  </li>
                  <li>
                    <a>Assistant et Support</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>A Propos</a>
              </li>
              <li>
                <a>Contact</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 z-20">
            <li>
              <a>Accueil</a>
            </li>
            <li>
              <details>
                <summary>Nos Services</summary>
                <ul className="p-2 w-52">
                  <li>
                    <a>Demande de Document</a>
                  </li>
                  <li>
                    <a>Assistant et Support</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Tableau de Bord</a>
            </li>
            <li>
              <a>A Propos</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <Link
            to="/login"
            className="btn bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-shadow"
          >
            Connexion
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen pt-2 flex items-center justify-center bg-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-16">
            {/* Left Content */}
            <div className="lg:w-2/3 space-y-6">
              <div className="relative space-y-6">
                <h1 className="text-xl sm:text-sm md:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight space-x-2">
                  Simplifiez vos{'  '}
                  <span className="absolute bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent z-10">
                    {phrases[activeIndex]}
                  </span>
                </h1>
                <p className="text-md md:text-xl lg:text-xl text-gray-600">
                  Une plateforme intelligente pour gérer tous vos documents officiels en quelques clics
                </p>
              </div>

              {/* Steps */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="group text-center p-4 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-blue-100 rounded-full text-blue-500 text-2xl font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Inscription Express</h3>
                  <p className="text-sm text-gray-500">Créez votre compte en quelques secondes</p>
                </div>

                <div className="group text-center p-4 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-purple-100 rounded-full text-purple-500 text-2xl font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Requête Intelligente</h3>
                  <p className="text-sm text-gray-500">Soumettez vos demandes en ligne</p>
                </div>

                <div className="group text-center p-4 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-pink-100 rounded-full text-pink-500 text-2xl font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Document Sécurisé</h3>
                  <p className="text-sm text-gray-500">Téléchargez vos PDF certifiés</p>
                </div>
              </div>

              {/* CTA Form */}
              <div className="max-w-xl space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Adresse email professionnelle"
                    className="w-full px-6 py-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Link
                    to="/login"
                    className="absolute right-2 top-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-md shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                  >
                    Commencer
                  </Link>
                </div>
                <p className="text-sm text-gray-500 text-center">
                  • Sécurité MOSIP intégrée • 100% confidentiel
                </p>
              </div>
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="lg:w-1/3 flex justify-center">
              <div className="dashboard-preview w-full max-w-md md:max-w-lg lg:max-w-xl h-auto">
                <img
                  src={janguXayma}
                  alt="Dashboard Preview"
                  className="rounded-xl border-8 border-white/20 transform rotate-1 object-contain w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;