


import React, { useState, useEffect } from 'react'
import userImage from '../../images/user.webp'
import { auth, db } from '../../Firebase'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import Button from '../Button'

const Signup = () => {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const user = localStorage.getItem("uid");
    useEffect(() => {
        if (user) {
            navigate("/todolist");
        }
    }, []);

    const signup = (e) => {
        e.preventDefault()

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                // console.log('sign up'. user);

                const userData = {
                    firstname,
                    lastname,
                    number,
                    email,
                    uid: userCredential.user.uid
                }
                await setDoc(doc(db, "Users Signup Data", userCredential.user.uid), userData);
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (firstname === '' || lastname === '' || number === '' || email === '' || password === '') {
                    alert('Please fill out all the fields')
                }
                else {
                    console.log('sign up error', errorMessage)
                    alert(errorMessage)
                }

            });
    }
    return (
        <div className='form-container'>
            <img src={userImage} />
            <form onSubmit={signup}>
                <h1>Sign up</h1>
                <input onChange={(e) => setFirstname(e.target.value)} type="text" placeholder='Enter first name' />
                <input onChange={(e) => setLastname(e.target.value)} type="text" placeholder='Enter last name' />
                <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Enter email' />
                <input onChange={(e) => setNumber(e.target.value)} type="number" placeholder='Enter contact number' />
                <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Enter password' />
                <div className='btn-container'>
                    <Button btnText="Sign up" />
                    <Link style={{ textDecoration: 'none' }} to="/firebase-auth">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Signup