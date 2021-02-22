import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import Modal from "react-modal";
function Popup(props) {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [userList, setuserList] = useState([]);
  const [userDataForTable, setUserDataForTable] = useState();
  const [selectedEditUser, setSelectedEditUser] = useState();
  const { register, handleSubmit, errors } = useForm();

  console.log(props);
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

  const loadData = async () => {
    await Axios.get("http://localhost:3001/read")
      .then((response) => {
        setuserList(response.data);
      })
      .then((receivedData) => setUserDataForTable(receivedData))
      .catch((err) => console.error(err));
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

  return (
    <div>
      <Modal className="Modal" ariaHideApp={false} isOpen={props.modalIsOpen}>
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
                    <div className="validation">Please choose a username.</div>
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
                    <div className="validation">Please choose a username.</div>
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
                    <div className="validation">Please choose a username.</div>
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
                    <div className="validation">Please choose a username.</div>
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
  );
}

export default Popup;
