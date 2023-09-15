import { Card, Container } from "react-bootstrap";
import { addUserData, editUserData } from '../Actions/Apicall';
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, 'Name should contain only text characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone_number: Yup.string()
    .matches(/^\d+$/, 'Phone number should contain only digits')
    .length(10, 'Phone number should be 10 digits')
    .required('Phone number is required'),
  message: Yup.string()
    .matches(/^[a-zA-Z\s]*$/, 'Message should contain only text characters')
    .required('Message is required'),
});

const Adduser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state || {};

  const isEditing = userData.id !== undefined;

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEditing) {
        await editUserData(userData.id, values);
        toast('Updated Data Successfully');
      } else {
        await addUserData(values);
        toast('Added Data Successfully');
      }
      setTimeout(() => {
        navigate('/userTable', { state: values });
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error('Error: Bad Request (400)');
      } else {
        toast.error('An error occurred');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm('Do you want to exit?');

    if (confirmCancel) {
      navigate('/userTable');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='background'>
        <Container className='addcontainer'>
          <Card className='back shadow'>
            <div className='back'>
              <h2>{isEditing ? 'Edit User' : 'Add User'}</h2>
            </div>
            <div className='formin'>
              <Formik
                initialValues={{
                  name: userData.name || '',
                  email: userData.email || '',
                  phone_number: userData.phone_number || '',
                  message: userData.message || '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="form-group">
                      <label htmlFor="name" className="label-left">Name</label>
                      <div className="form-control-container">
                        <Field type="text" id="name" name="name" className="form-control" />
                        <ErrorMessage name="name" component="div" className="text-danger error-message" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="label-left">Email</label>
                      <div className="form-control-container">
                        <Field type="text" id="email" name="email" className="form-control" />
                        <ErrorMessage name="email" component="div" className="text-danger error-message" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone_number" className="label-left">Phone Number</label>
                      <div className="form-control-container">
                        <Field
                          type="text"
                          id="phone_number"
                          name="phone_number"
                          className="form-control"
                        />
                        <ErrorMessage name="phone_number" component="div" className="text-danger error-message" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message" className="label-left">Message</label>
                      <div className="form-control-container">
                        <Field
                          as="textarea"
                          id="message"
                          name="message"
                          className="form-control"
                        />
                        <ErrorMessage name="message" component="div" className="text-danger error-message" />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="buttonalign gap-2">
                      <button
                        type="submit"
                        className={isEditing ? 'btn btn-primary' : 'btn btn-success'}
                        disabled={isSubmitting}
                      >
                        {isEditing ? 'Update' : 'Submit'}
                      </button>
                      <button
                        className="btn btn-danger"
                        type="button"
                        onClick={handleCancel}
                        disabled={isSubmitting}
                      >
                        Cancel
                      </button>
                    </div>
                  </Form>

                )}
              </Formik>
            </div>
          </Card>
        </Container>
      </div>
    </>
  );
}

export default Adduser;
