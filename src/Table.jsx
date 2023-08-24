import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { Button, Container, Modal, Navbar, Table } from "react-bootstrap";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";
import './App.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { deleteUserData } from "./Apicall";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate';
import { InfinitySpin } from 'react-loader-spinner';
import Avatar from 'react-avatar';
import { BiSolidSortAlt } from "react-icons/bi";
import concert from "./MicrosoftTeams-image.png"

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
      navigate(`/editUser/${user.id}`, { state: user });
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
      <div className="conatiner-fluid h-100">
        <div className="row h-100">
          <div className="col-2 bg-danger">
            <div>
              <img src={concert} alt="logo" style={{ marginLeft: 65, width: 150, height: 150 }} />
            </div>
            <hr />
            <div >
              <Button className="tabledashbutton" >Dashboard</Button>
            </div>
            <div className="mt-1">
            <Button className="tabledashbutton" onClick={()=>navigate("/")}>Logout</Button>

            </div>
          </div>
          <div className="col-10 bg-info m-0 p-0">
            <Navbar className="bg-success">
              <Container>
                <Navbar.Brand href="#home">ConcertIdc</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                  <Navbar.Text>
                    Signed in as: <a href="#login">Vijay Kishor</a>
                  </Navbar.Text>
                </Navbar.Collapse>
              </Container>
            </Navbar>
            <div className="container mt-4">
              <div className="text-end">
                <Button className="btn btn-danger" onClick={() => navigate("/addUser")} >Add User</Button>
              </div>
              <h3 className="text-white">Fetching the Users</h3>

              <Table striped bordered hover className="shadow table-responsive">
                <thead>
                  <tr>
                    <th className="text-center">S.No &nbsp;<BiSolidSortAlt /></th>
                    <th className="text-center">Name  &nbsp;<BiSolidSortAlt /></th>
                    <th className="text-center">Email  &nbsp;<BiSolidSortAlt /></th>
                    <th className="text-center">Phone Number  &nbsp;<BiSolidSortAlt /></th>
                    <th className="text-center">Message  &nbsp;<BiSolidSortAlt /></th>
                    <th className="text-center">CreatedAt  &nbsp;<BiSolidSortAlt /></th>
                    <th className="text-center">UpdatedAt  &nbsp;<BiSolidSortAlt /></th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.response?.paginationOutput?.results?.length > 0 ? (
                    data?.response?.paginationOutput?.results?.map((user, index) => {
                      const currentSNo = index + 1 + pageNumber * usersPerPage;
                      return (
                        <tr key={index}>
                          <td>{currentSNo} </td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.phone_number}</td>
                          <td>{user.message}</td>
                          <td>{moment(user.createdAt).format("MM/DD/YYYY")}</td>
                          <td>{moment(user.updatedAt).format("MM/DD/YYYY")}</td>
                          <td>
                            <Button
                              onClick={() => handleShowClick(user)}
                              style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                                color: "skyblue",
                              }}
                            >
                              <AiFillEye />
                            </Button>
                            <Button
                              onClick={() => handleEditClick(user)}
                              style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                                color: "green",
                              }}
                            >
                              <AiFillEdit />
                            </Button>
                            <Button
                              onClick={() => handleDeleteClick(user.id)}
                              style={{
                                backgroundColor: "transparent",
                                borderColor: "transparent",
                                color: "red",
                              }}
                            >
                              <AiFillDelete />
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
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>User Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {selectedUser && (
                    <>
                      <div class="row">
                        <div className="col-3 mt-4">
                          <Avatar name={selectedUser.name} round="100px" />
                        </div>
                        <div className="col-9 fw-bold">
                          <p >{selectedUser.name}</p>
                          <p>{selectedUser.email}</p>
                          <p>{selectedUser.phone_number}</p>
                          <p>{selectedUser.message}</p>
                        </div>
                      </div>

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
                // containerClassName={"pagination"}
                // previousLinkClassName={"pagination__link"}
                // nextLinkClassName={"pagination__link"}
                // disabledClassName={"pagination__link--disabled"}
                // activeClassName={"pagination__link--active"}
                // pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"


                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
              />


              <ToastContainer />



            </div>
          </div>
        </div>
      </div>



    </>
  );
}

export default UserTable;

