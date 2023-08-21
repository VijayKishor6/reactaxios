import { useState } from 'react';
import './Adduser.css';
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { addUserData, editUserData } from './Apicall';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';


const Adduser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state || {};

  const [formData, setFormData] = useState({
    name: userData.name || '',
    email: userData.email || '',
    phone_number: userData.phone_number || '',
    message: userData.message || '',
  });

  const isEditing = userData.id !== undefined;


  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    phone_number: '',
    message: '',
  });

  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: '',
      email: '',
      phone_number: '',
      message: '',
    };

    if (!formData.name.match(/^[a-zA-Z\s]*$/)) {
      isValid = false;
      errors.name = 'Name should contain only text characters';
    }

    if (!formData.email.match(/\S+@\S+\.\S+/)) {
      isValid = false;
      errors.email = 'Invalid email format';
    }

    if (formData.phone_number.length !== 10 || !formData.phone_number.match(/^\d+$/)) {
      isValid = false;
      errors.phone_number = 'Phone number should be 10 digits';
    }

    if (!formData.message.match(/^[a-zA-Z\s]*$/)) {
      isValid = false;
      errors.message = 'Message should contain only text characters';
    }

    setValidationErrors(errors);
    return isValid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      if (isEditing) {
        await editUserData(userData.id, formData);
        toast('Updated Data Successfully');
      } else {
        await addUserData(formData);
        toast('Added Data Successfully');
      }
      navigate('/', { state: formData });
    }
  };

  const handleCancel = () => {
    const confirmCancel = window.confirm('Do you want to exit?');

    if (confirmCancel) {
      navigate('/');
    }
  };

  return (
    <Container className='addcontainer'>
      <Card className='back shadow'>
        <div className='back'>   <h2>{isEditing ? 'Edit User' : 'Add User'}</h2></div>
        <div className='formin'>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Name" id="name" name="name" value={formData.name} onChange={handleChange} />
                <Form.Text className="text-danger">{validationErrors.name}</Form.Text>

              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Email
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Email" id="email" name="email" value={formData.email} onChange={handleChange} />
                <Form.Text className="text-danger">{validationErrors.email}</Form.Text>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Conatct
              </Form.Label>
              <Col sm="10">
                <Form.Control type="text" placeholder="Phone Number" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} />
                <Form.Text className="text-danger">{validationErrors.phone_number}</Form.Text>

              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Message
              </Form.Label>
              <Col sm="10">
                <Form.Control placeholder="Message" as="textarea" rows={3} id="message" name="message" value={formData.message} onChange={handleChange} />
                <Form.Text className="text-danger">{validationErrors.message}</Form.Text>

              </Col>
            </Form.Group>
            <div className='buttonalign gap-2'>
              <Button type="submit" className={isEditing ? 'btn-primary' : 'btn-success'}>
                {isEditing ? 'Update' : 'Submit'}
              </Button>
              <Button className='btn-danger' onClick={handleCancel}>Cancel</Button>
            </div>
          </Form>
        </div>
      </Card>

    </Container>
  );
}

export default Adduser;

