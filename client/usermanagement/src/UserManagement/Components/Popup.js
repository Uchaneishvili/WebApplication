import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import Modal from "react-modal";
import "./Popup.css";
function Popup(props) {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

  const onSubmitInsert = () => {
    if (
      props.selectedEditUser.firstName != undefined &&
      props.selectedEditUser.lastName != undefined &&
      props.selectedEditUser.email != undefined &&
      props.selectedEditUser.phone != undefined &&
      props.selectedEditUser.phone.length == 9
    ) {
      props.loadData(1);
      props.closePopup();
    }
  };

  const onSubmit = () => {
    if (
      props.selectedEditUser.firstName &&
      props.selectedEditUser.lastName &&
      props.selectedEditUser.email &&
      props.selectedEditUser.phone &&
      props.selectedEditUser.phone.length == 9
    ) {
      props.loadData(1);
      props.closePopup();
      setButtonIsDisabled(false);
    } else if (
      props.selectedEditUser.firstName != undefined &&
      props.selectedEditUser.lastName != undefined &&
      props.selectedEditUser.email != undefined &&
      props.selectedEditUser.phone != undefined &&
      props.selectedEditUser.phone.length == undefined
    ) {
      props.loadData(1);
      props.closePopup();
      setButtonIsDisabled(false);
    }

    return <h1>test</h1>;
  };

  const onSubmitupdate = () => {
    if (
      props.selectedEditUser.firstName != undefined &&
      props.selectedEditUser.lastName != undefined &&
      props.selectedEditUser.email != undefined &&
      props.selectedEditUser.phone != undefined &&
      props.selectedEditUser.phone.length == undefined
    ) {
      props.loadData(1);
      props.closePopup();
    }
  };

  useEffect(() => {
    setmodalIsOpen(props.modalIsOpen);
  }, [props.modalIsOpen]);

  const addOrUpdateUser = async () => {
    if (props.selectedEditUser && props.selectedEditUser._id) {
      await Axios.put("http://localhost:3001/update", {
        _id: props.selectedEditUser._id,
        firstName: props.selectedEditUser.firstName,
        lastName: props.selectedEditUser.lastName,
        email: props.selectedEditUser.email,
        phone: props.selectedEditUser.phone,
      });
      onSubmitupdate();
      setButtonIsDisabled(true);
    } else {
      await Axios.post("http://localhost:3001/insert", {
        firstName: props.selectedEditUser.firstName,
        lastName: props.selectedEditUser.lastName,
        email: props.selectedEditUser.email,
        phone: props.selectedEditUser.phone,
      });
      onSubmitInsert();
      setButtonIsDisabled(true);
    }
  };

  const lastNameFunction = (event) => {
    props.setSelectedEditUser({
      ...props.selectedEditUser,
      lastName: event.target.value,
    });
    setButtonIsDisabled(false);
  };

  const firstNameFunction = (event) => {
    props.setSelectedEditUser({
      ...props.selectedEditUser,
      firstName: event.target.value,
    });
    setButtonIsDisabled(false);
  };

  const emailFunction = (event) => {
    props.setSelectedEditUser({
      ...props.selectedEditUser,
      email: event.target.value,
    });
    setButtonIsDisabled(false);
  };

  const phoneFunction = (event) => {
    props.setSelectedEditUser({
      ...props.selectedEditUser,
      phone: event.target.value,
    });
    setButtonIsDisabled(false);
  };

  return (
    <div>
      <Modal className="Modal" ariaHideApp={false} isOpen={modalIsOpen}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              {props.selectedEditUser && props.selectedEditUser._id ? (
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
                onClick={() => props.closePopup()}
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
                    defaultValue={props.selectedEditUser?.firstName}
                    className="form-control firstName"
                    placeholder="Enter your first name"
                    aria-label="Firstname"
                    name="firstName"
                    ref={register({ required: true })}
                    onChange={(event) => {
                      firstNameFunction(event);
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
                    defaultValue={props.selectedEditUser?.lastName}
                    className="form-control"
                    placeholder="Enter your last name"
                    name="lastName"
                    ref={register({ required: true })}
                    onChange={(event) => {
                      lastNameFunction(event);
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
                    defaultValue={props.selectedEditUser?.email}
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
                    ref={register({ required: true })}
                    onChange={(event) => {
                      emailFunction(event);
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
                    defaultValue={props.selectedEditUser?.phone}
                    className="form-control"
                    placeholder="Enter your phone"
                    name="phone"
                    ref={register({
                      required: true,
                      minLength: 9,
                      maxLength: 9,
                    })}
                    onChange={(event) => {
                      phoneFunction(event);
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
                    onClick={() => props.closePopup()}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-primary saveButton"
                    disabled={buttonIsDisabled}
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
