import React, { useState } from 'react';
import '../Css/index.css';
import { useNavigate } from "react-router-dom";
import { Button } from 'react-bootstrap';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../Global/Interceptor';


// ... (other imports and component setup)

const Login = ({ setIsSignedIn }) => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLoading) {
      return; // Do nothing if the button is already disabled
    }

    setIsLoading(true);

    try {
      const log = await api.post("/admin/login", {
        email: userName,
        password: password,
      });

      if (log.status === 200) {
        localStorage.setItem("accesstoken", log.data.accesstoken);
        setIsSignedIn(true);
        toast("Logged in successfully");
        setTimeout(() => {          
          setIsLoading(false);
          navigate("/userTable");
        }, 2000);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 400) {
        toast("Check the Email and Password");
      } else {
        toast("An error occurred while logging in");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login-container">
        <div className="login-form">
          <h2 className='text-center headlogin'>Login</h2>
          <form>
            <div className="form-group headlogin">
              <label htmlFor="username">Username</label>
              <input type="text" placeholder='Username' id="username" name="username" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </div>
            <div className="form-group headlogin">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder='Password' id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <p className='headlogin'><a href="!#">Forget Password!</a></p>

            <div className="form-group text-center">
              <Button type="submit" onClick={handleLogin} disabled={isLoading}>
                {isLoading ? 'Logging In...' : 'Login'}
              </Button>
            </div>
            {isLoading && <div className="loader"></div>}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
