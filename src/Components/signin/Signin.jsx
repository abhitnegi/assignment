import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseconfig'
import './Signin.css'

const Signin = () => {
  const [ registerEmail, setRegisterEmail ] = useState("")
  const [ registerPass, setRegisterPass ] = useState("")
  const navigate = useNavigate();

  const register = async () => {
    try{
      const user = await createUserWithEmailAndPassword( auth, registerEmail, registerPass)
      navigate('/task')
    } catch(error){
      console.log(error.message)
    }
  }
  return (
    <div className='signup'>
      <div className="signin">
        <h1>SIGN UP</h1>
        <input type="text" placeholder='Enter Email.......' onChange={(e) => setRegisterEmail(e.target.value)}/>
        <input type="password" placeholder='Enter Password.........' onChange={(e) => setRegisterPass(e.target.value)}/>
        <button onClick={register}>SIGN UP</button>
      </div>
      <div className="login-sign">
        <h5>Have an account? <Link to='/'>Log In</Link></h5>
      </div>
    </div>
  )
}

export default Signin
