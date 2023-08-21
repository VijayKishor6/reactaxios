import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { Button, Container, Modal, Table } from "react-bootstrap";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import './App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteUserData } from "./Apicall";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { InfinitySpin } from 'react-loader-spinner';

const UserTable = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 5;
  console.log(data);

  const fetchUserData = async (page) => {
    try {
      const response = await axios.get(
        `https://fts-backend.onrender.com/admin/testing/getallusers?page=${page + 1}&size=${usersPerPage}`);
      return response.data;

    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // page change happens here
  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleEditClick = (user) => {
    const confirmEdit = window.confirm("Do you want to edit?");
    if (confirmEdit) {
      navigate('/adduser', { state: user });
    }
  };

  const handleDeleteClick = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete?");
    if (confirmDelete) {
      try {
        await deleteUserData(id);
        toast("Thanks For deleting");
        const updatedData = await fetchUserData();
        setData(updatedData);
      } catch (error) {
        console.log(error);
      }

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
    const fetchData = async () => {
      try {
        const responseData = await fetchUserData(pageNumber);
        setData(responseData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [pageNumber]);
  return (
    <>
      <Container>
        <div className="nav">heloo</div>
        <div className="text-end">

          <Button className="btn btn-danger" onClick={() => navigate("/adduser")} >Add User</Button>
        </div>
        <h3 className="text-white">Fetching the Users</h3>
        <Table striped bordered hover className="shadow table-responsive">
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
            {data?.response?.paginationOutput?.results?.length > 0 ? (
              data?.response?.paginationOutput?.results?.map((user, index) => {
                const currentSNo = index + 1 + pageNumber * usersPerPage;
                return (
                  <tr key={index}>
                    <td>{currentSNo}</td>
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
                        <AiFillEye />
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="text-center " colSpan={8}>
                  {data ? "No data found" : <InfinitySpin width="200" color="#e6470d" />}
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
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={data?.response?.paginationOutput?.totalPages || 0}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />


      <ToastContainer />
    </>
  );
}

export default UserTable;

