

import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import TodoList from './components/TodoList'
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';

const App = () => {

  return (
    <div className='App'>

      <Routes>
        {/* written path='firebase-auth' due to issue in deployment to gh-pages  */}
        <Route path="/firebase-auth" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/todolist" element={<TodoList />}></Route>
        </Route>

      </Routes>

    </div>
  );
}

export default App;
