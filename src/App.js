import { Routes, Route, BrowserRouter } from 'react-router-dom';
import UserTable from './pages/Table';
import "bootstrap/dist/css/bootstrap.css";
import Adduser from './pages/Adduser';
import Private from './pages/Private';
import { useEffect } from 'react';
import { useState } from 'react';
import Login from './pages/Login';

function App() {
  const access = localStorage.getItem("accesstoken");
  // const location = window.location.pathname
  const [isSignedIn, setIsSignedIn] = useState(access !==null);
  useEffect(() => {
   localStorage.removeItem("accesstoken");
  }, [])
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login  setIsSignedIn={setIsSignedIn}/>}></Route>
        <Route path='/userTable' element={<Private isSignedIn={isSignedIn}><UserTable /></Private>}></Route>
        <Route path="/addUser" element={<Private isSignedIn={isSignedIn}><Adduser /></Private>}></Route>
        <Route path="/editUser/:id" element={<Private isSignedIn={isSignedIn}><Adduser /></Private>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
