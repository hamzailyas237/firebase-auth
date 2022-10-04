

import React from 'react'
import { auth } from '../../Firebase'
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import Button from '../Button';


const Logout = () => {

  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault()

    signOut(auth).then(() => {
      localStorage.removeItem('uid')
      navigate('/firebase-auth')
    })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <form className='logout-btn-container' onSubmit={logout}>
        <Button btnText="Log out"/>
      </form>
    </div>
  )
}

export default Logout



