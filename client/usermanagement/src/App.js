import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";

function App() {
  const [userList, setuserList] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [userDataForTable, setUserDataForTable] = useState();
  const [selectedEditUser, setSelectedEditUser] = useState();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = () => {
    if (
      selectedEditUser.firstName &&
      selectedEditUser.lastName &&
      selectedEditUser.phone &&
      selectedEditUser.email
    ) {
      setmodalIsOpen(false);
    }
  };

  const addOrUpdateUser = async () => {
    if (selectedEditUser && selectedEditUser._id) {
      await Axios.put("http://localhost:3001/update", {
        _id: selectedEditUser._id,
        firstName: selectedEditUser.firstName,
        lastName: selectedEditUser.lastName,
        email: selectedEditUser.email,
        phone: selectedEditUser.phone,
      });
    } else {
      await Axios.post("http://localhost:3001/insert", {
        firstName: selectedEditUser.firstName,
        lastName: selectedEditUser.lastName,
        email: selectedEditUser.email,
        phone: selectedEditUser.phone,
      });
    }
    loadData();
  };

  function editUser(user) {
    setSelectedEditUser(user);
    setmodalIsOpen(true);
    loadData();
  }

  const deleteUser = async (id) => {
    await Axios.delete(`http://localhost:3001/delete/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, [selectedEditUser]);

  const loadData = async () => {
    await Axios.get("http://localhost:3001/read")
      .then((response) => {
        setuserList(response.data);
      })
      .then((receivedData) => setUserDataForTable(receivedData))
      .catch((err) => console.error(err));
  };

  const editClick = () => {
    setSelectedEditUser({});
    setmodalIsOpen(true);
  };

  return (
    <div className="container">
      <pre>{JSON.stringify(selectedEditUser, null, 2)}</pre>
      <div className="centerButtonContainer">
        <button
          type="button"
          className="btn btn-light custom-button"
          onClick={editClick}
        >
          Add User
        </button>
      </div>
      <div className="userListContainer">
        <div className="mapData">
          <table className="table">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.map((val, key) => {
                return (
                  <tr key={val._id}>
                    <td scope="col" className="firstNameTable" id="FirstName">
                      {val.firstName}
                    </td>
                    <td scope="col" className="lastNameTable" id="LastName">
                      {val.lastName}
                    </td>
                    <td scope="col" className="emailTable" id="Email">
                      {val.email}
                    </td>
                    <td scope="col" className="phoneTable" id="Phone">
                      {val.phone}
                    </td>
                    <td scope="col" className="buttonsContainer" id="Action">
                      <button
                        className="btn btn-danger deteleTableButton"
                        onClick={() => deleteUser(val._id)}
                      >
                        delete
                      </button>
                      <button
                        className="btn btn-success updateTableButton"
                        onClick={() => editUser(val)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="ModalMainContainer">
          <Modal className="Modal" isOpen={modalIsOpen} ariaHideApp={false}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  {selectedEditUser && selectedEditUser._id ? (
                    <h5 className="modal-title" id="exampleModalLabel">
                      Update User Information
                    </h5>
                  ) : (
                    <h5 className="modal=title" id="exampleModalLabel1">
                      Create User
                    </h5>
                  )}
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    onClick={() => setmodalIsOpen(false)}
                  >
                    X
                  </button>
                </div>

                <div>
                  <form className="popupForm" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group popup">
                      <label>First Name: </label>
                      <input
                        type="text"
                        defaultValue={selectedEditUser?.firstName}
                        className="form-control firstName"
                        placeholder="Enter your first name"
                        aria-label="Firstname"
                        name="firstName"
                        ref={register({ required: true })}
                        onChange={(event) => {
                          setSelectedEditUser({
                            ...selectedEditUser,
                            firstName: event.target.value,
                          });
                        }}
                      />
                      {errors.firstName && (
                        <div className="validation">
                          Please choose a username.
                        </div>
                      )}
                    </div>

                    <div className="form-group popup">
                      <label>Last Name: </label>
                      <input
                        type="text"
                        defaultValue={selectedEditUser?.lastName}
                        className="form-control"
                        placeholder="Enter your last name"
                        name="lastName"
                        ref={register({ required: true })}
                        onChange={(event) => {
                          setSelectedEditUser({
                            ...selectedEditUser,
                            lastName: event.target.value,
                          });
                        }}
                      />
                      {errors.lastName && (
                        <div className="validation">
                          Please choose a username.
                        </div>
                      )}
                    </div>

                    <div className="form-group popup">
                      <label>Email address: </label>
                      <input
                        type="text"
                        defaultValue={selectedEditUser?.email}
                        className="form-control"
                        placeholder="Enter your email"
                        name="email"
                        ref={register({ required: true })}
                        onChange={(event) => {
                          setSelectedEditUser({
                            ...selectedEditUser,
                            email: event.target.value,
                          });
                        }}
                      />

                      {errors.email && (
                        <div className="validation">
                          Please choose a username.
                        </div>
                      )}
                    </div>

                    <div className="form-group popup">
                      <label>Phone: </label>
                      <input
                        type="number"
                        defaultValue={selectedEditUser?.phone}
                        className="form-control"
                        placeholder="Enter your phone"
                        name="phone"
                        ref={register({
                          required: true,
                          minLength: 9,
                          maxLength: 9,
                        })}
                        onChange={(event) => {
                          setSelectedEditUser({
                            ...selectedEditUser,
                            phone: event.target.value,
                          });
                        }}
                      />

                      {errors.phone && (
                        <div className="validation">
                          Please choose a username.
                        </div>
                      )}
                    </div>

                    <div className="buttonOfModal">
                      <button
                        type="button"
                        className="btn btn-secondary closeButton"
                        data-bs-dismiss="modal"
                        onClick={() => setmodalIsOpen(false)}
                      >
                        Close
                      </button>
                      <button
                        className="btn btn-primary saveButton"
                        onClick={() => addOrUpdateUser()}
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default App;
