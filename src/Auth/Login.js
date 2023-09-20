import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../Css/index.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../Global/Interceptor';

const Login = ({ setIsSignedIn }) => {
  const navigate = useNavigate();

  const initialValues = {
    userName: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    userName: Yup.string()
      .required('Username is required')
      .matches(/^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/, 'Enter valid mail id'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])\S*$/,
        'Password must contain at least one letter, one number, and one special character'
      ),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const log = await api.post('/admin/login', {
        email: values.userName,
        password: values.password,
      });

      if (log.status === 200) {
        localStorage.setItem('accesstoken', log.data.accesstoken);
        setIsSignedIn(true);
        toast('Logged in successfully');
        setTimeout(() => {
          setSubmitting(false);
          navigate('/userTable');
        }, 2000);
      }
    } catch (error) {
      setSubmitting(false);
      if (error.response && error.response.status === 400) {
        toast('Check the Email and Password');
      } else {
        toast('An error occurred while logging in');
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="login-container">
        <div className="login-form">
          <h2 className="text-center headlogin">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, values }) => (
              <Form>
                <div className="form-group headlogin">
                  <label htmlFor="userName">Username</label>
                  <Field type="text" id="userName" name="userName" placeholder="Username" />
                  <ErrorMessage name="userName" component="div" className="error" />
                </div>
                <div className="form-group headlogin">
                  <label htmlFor="password">Password</label>
                  <Field type="password" id="password" name="password" placeholder="Password" />
                  <ErrorMessage name="password" component="div" className="error" />
                </div>
                <p className="headlogin">
                  <a href="!#">Forget Password!</a>
                </p>

                <div className="form-group text-center">
                  <Button type="submit" disabled={isSubmitting || !(values.userName && values.password)}>
                    {isSubmitting ? 'Logging In...' : 'Login'}
                  </Button>
                </div>
                {isSubmitting && <div className="loader"></div>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Login;
