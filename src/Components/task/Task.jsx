import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseconfig'
import { signOut } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../firebaseconfig'
import './Task.css'

const Task = () => {
    const [ title, setTitle ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ comment, setComment ] = useState("")
    const [ date, setDate ] = useState("")
    const taskCollectionRef = collection(db, "tasks")
    const [ assign, setAssign ] = useState("");
    const navigate = useNavigate()
    const logOut = async () => {
        await signOut(auth)
        navigate('/')
    }

    const createTask = async () => {
        await addDoc(taskCollectionRef, {title: title, description: description,comment: comment, date: date, assign: assign})
        alert("Task Successfully Added")
    }

  return (
    <div className="home">
        <div className="navbar">
            <Link to='/task'>Create Task</Link>
            <Link to='/list'>Task(s) List</Link>
            <button onClick={logOut}>LOGOUT</button>
        </div>
        <div className='task'>
            <div className="create">
                <h1>Welcome, {auth.currentUser?.email}</h1>
                <h2>CREATE TASK</h2>
                <input type="text" placeholder='Enter Title.......' onChange={(e) => setTitle(e.target.value)} value={title}/>
                <input type="text" placeholder='Enter Description.........' onChange={(e) => setDescription(e.target.value)} value={description}/>
                <input type="text" placeholder='Enter Comment.........' onChange={(e) => setComment(e.target.value)} value={comment}/>
                <input type="text" placeholder='Assigned To..........' onChange={(e) => setAssign(e.target.value)} value={assign}/>
                <input type="date" placeholder='Enter Due Date..........' onChange={(e) => setDate(e.target.value)} value={date}/>
                <button onClick={createTask}>ADD</button>
            </div>
        </div>
    </div>
  )
}

export default Task
