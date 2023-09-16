import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebaseconfig'
import './Login.css'

const Login = () => {
  const [ Email, setEmail ] = useState("")
  const [ Pass, setPass ] = useState("")
  const navigate = useNavigate();

  const login = async () => {
    try{
      const user = await signInWithEmailAndPassword( auth, Email, Pass)
      navigate('/task')
    } catch(error){
      console.log(error.message)
    }
  }
  return (
    <div className='login'>
      <div className="login-home">
        <h1>LOGIN</h1>
        <input type="text" placeholder='Enter Email.......' onChange={(e) => setEmail(e.target.value)}/>
        <input type="password" placeholder='Enter Password.........' onChange={(e) => setPass(e.target.value)}/>
        <button onClick={login}>LOGIN</button>
      </div>
      <div className="signin">
        <h5>Don't have an account? <Link to='/signin'>Sign up</Link></h5>
      </div>
    </div>
  )
}

export default Login
