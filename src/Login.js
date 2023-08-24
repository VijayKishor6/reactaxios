import React from 'react';
import './Login.css';
import {useNavigate} from "react-router-dom";
import { Button } from 'react-bootstrap';


const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className='text-center headlogin'>Login</h2>
        <form>
          <div className="form-group headlogin">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder='Username' id="username" name="username" />
          </div>
          <div className="form-group headlogin">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder='Password' id="password" name="password" />
          </div>
          <p className='headlogin'><a href="#">Forget Password!</a></p>

          <div className="form-group text-center">
            <Button type="submit" onClick={() => navigate("/userTable")} >Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
