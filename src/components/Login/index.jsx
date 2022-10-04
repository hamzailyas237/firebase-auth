

import React, { useState, useEffect } from 'react'
import userImage from '../../images/user.webp'
import { auth, db } from '../../Firebase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import  Button from '../Button';

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const user = localStorage.getItem("uid");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/todolist");
    }
  }, []);

  const login = (e) => {
    e.preventDefault()

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        // console.log('sign in ', userCredential.user);

        localStorage.setItem('uid', userCredential.user.uid)
        navigate("/todolist")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (email === '' || password === '') {
          alert('Please fill out all the fields')
        }
        else {
          console.log('sign in error', errorMessage);
          alert(errorMessage)
        }
      });
  }
  return (


    <div className='form-container'>

      <img src={userImage} />
      <form onSubmit={login}>
        <h1>Login</h1>
        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter email' />
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter password' />
        <div className='btn-container'>
          <Button btnText="Login" />
          <Link style={{textDecoration: 'none' }} to="/signup">Sign up</Link>
        </div>
      </form>
    </div>



  )
}

export default Login

