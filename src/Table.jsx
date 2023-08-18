import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { Button, Container, Modal, Table } from "react-bootstrap";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import './App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteUserData} from "./Apicall";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function UserTable() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const deleteData = async (id) => {
    await deleteUserData(id);
    toast("Thanks For deleting");
    await fetchUserData();
  }
  const [data, setData] = useState([]);
  console.log(data);
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://fts-backend.onrender.com/admin/testing/getallusers?offset=1&limit=10"
      );
      return response.data;

    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleEditClick = (user) => {
    const confirmEdit = window.confirm("Do you want to edit?");
    if (confirmEdit) {
      navigate('/adduser', { state: user });
    }
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm("Do you want to delete?");
    if (confirmDelete) {
      deleteData(id);
    }
  };
  const handleShowClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };
  useEffect(() => {
    const ee = async () => {
      try {
        const ees = await fetchUserData()
        console.log(ees, "tets");
        setData(ees);
      } catch (e) {
        console.log(e);
      }

    }
    ee()
  }, [data]);

  return (
    <>
      <Container>
        <div className="text-end">
          <Button className="bg-danger border-0" onClick={() => navigate("/adduser")} >Add</Button>
        </div>
        <h3 className="text-white">Fetching the Data's</h3>
        <Table striped bordered hover className="shadow">
          <thead>
            <tr>
              <th className="text-center">S.No</th>
              <th className="text-center">Name</th>
              <th className="text-center">Email</th>
              <th className="text-center">Phone Number</th>
              <th className="text-center">Message</th>
              <th className="text-center">CreatedAt</th>
              <th className="text-center">UpdatedAt</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.response?.paginationOutput?.items?.length > 1 ? (
              data?.response?.paginationOutput?.items?.map((user, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone_number}</td>
                    <td>{user.message}</td>
                    <td>{moment(user.createdAt).format("MM/DD/YYYY")}</td>
                    <td>{moment(user.updatedAt).format("MM/DD/YYYY")}</td>
                    <td>
                      <Button
                        onClick={() => handleEditClick(user)}
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                          color: "black",
                        }}
                      >
                        <AiFillEdit />
                      </Button>
                      <Button
                        onClick={() => handleDeleteClick(user.id)}
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                          color: "black",
                        }}
                      >
                        <AiFillDelete />
                      </Button>
                      <Button
                      onClick={() => handleShowClick(user)}
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                          color: "black",
                        }}
                      >
                      <AiFillEye/>
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="text-center " colSpan={8}>
                  <h3>No Data Found</h3>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
       

      </Container>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <p>Name: {selectedUser.name}</p>
              <p>Email: {selectedUser.email}</p>
              <p>Phone Number: {selectedUser.phone_number}</p>
              <p>Message:{selectedUser.message}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <ToastContainer />
    </>
  );
}

export default UserTable;

