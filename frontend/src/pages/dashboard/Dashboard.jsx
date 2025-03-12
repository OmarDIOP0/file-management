import React, { useContext } from 'react'
import  AuthContext from '../../context/Authcontext'
import { jwtDecode } from 'jwt-decode'

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const {logoutUser} = useContext(AuthContext);

  return (
    <div>
      <div>
      <h1 className="text-2xl font-semibold text-center px-3">Tableau de bord</h1>
        <div className="col d-flex ">
          <p>Bienvenue {user.username}!</p>
          <p>Votre email : {user.email}</p>
          <p>Votre role : {user.role}</p>
          <button  onClick={logoutUser} className="btn btn-soft btn-secondary px-3">logout !</button>   
        </div>
      </div>
    </div>
  )
}
