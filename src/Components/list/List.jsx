import React,{ useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { db, auth } from '../../firebaseconfig'
import { getDocs, collection, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import './List.css'

const List = () => {  
    const [ list, setList ] = useState([]);
    const [ id, setId ] = useState("");
    const [ view, setView ] = useState(false);
    const taskCollectionRef = collection(db, "tasks")
    const [ title, setTitle ] = useState("")
    const [ description, setDescription ] = useState("")
    const [ comment, setComment ] = useState("")
    const [ date, setDate ] = useState("")
    const [ assign, setAssign ] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const getTaskLists = async () => {
            try{
                const data = await getDocs(taskCollectionRef)
                const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
                setList(filteredData)
            } catch(error) {
                console.error(error)
            }
        }

        getTaskLists();
    }, [])

    const update = (id) => {
      setId(id)
      setView(!view)
    }

    const add = async (id, title, description,comment,assign,date) => {
      const userDoc = doc(db , "tasks", id)
      const newfield = {title: title, description: description,comment: comment,assign: assign,date: date}
      await updateDoc(userDoc, newfield)
      alert("Task Updated")
    }

    const deleteTask = async(id) => {
      const userDoc = doc(db, "tasks", id)
      await deleteDoc(userDoc)
    }

  return (
    <div>
      <div className="navbar">
          <Link to='/task'>Create Task</Link>
          <Link onClick={() => setView(!view)}>Task List(s)</Link>
        </div>
      <div className="main-content"> 
        {list.map((value) => {
          if(auth.currentUser?.email === value.assign){
            return(
            <>
            {!view && <div className='content'>
              <h1>Title : {value.title}</h1>
              <h2>Description : {value.description}</h2>
              <h2>Comment : {value.comment}</h2>
              <h2>Data : {value.date}</h2>
              <h2>Assigned to : {value.assign}</h2>
              <button onClick={() => update(value.id)}>Update</button>
              <button onClick={() => deleteTask(value.id)}>Delete</button>
            </div>}
            </>)
            }})}
        </div> 
        <div className="task-create">
          {view && <div className='create'>
                <h1>Update Task</h1>
                <input type="text" placeholder='Enter Title.......' onChange={(e) => setTitle(e.target.value)} value={title}/>
                <input type="text" placeholder='Enter Description.........' onChange={(e) => setDescription(e.target.value)} value={description}/>
                <input type="text" placeholder='Enter Comment.........' onChange={(e) => setComment(e.target.value)} value={comment}/>
                <input type="text" placeholder='Assigned To..........' onChange={(e) => setAssign(e.target.value)} value={assign}/>
                <input type="date" placeholder='Enter Due Date..........' onChange={(e) => setDate(e.target.value)} value={date}/>
                <button onClick={() => add(id, title, description, comment, assign,date)}>ADD</button></div>}
        </div>
    </div>
  )
}

export default List
