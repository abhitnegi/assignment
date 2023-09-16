import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './Components/signin/Signin';
import Task from './Components/task/Task';
import Login from './Components/login/Login';
import List from './Components/list/List';

function App() {
  return (
    <div className="App">
      <Router basename='/assignment'>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path='/signin' element={<Signin />}/>
          <Route path='/task' element={<Task />}/>
          <Route path='/list' element={<List />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
