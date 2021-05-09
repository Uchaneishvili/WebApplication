import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import Modal from "react-modal";
import "./Popup.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required(),
  phone: yup.number().required().min(6),
});

function Popup(props) {
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = (data) => {
    console.log(data);
    console.log(errors);
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
    } else {
      await Axios.post("http://localhost:3001/insert", {
        firstName: props.selectedEditUser.firstName,
        lastName: props.selectedEditUser.lastName,
        email: props.selectedEditUser.email,
        phone: props.selectedEditUser.phone,
      });
    }
  };

  const lastNameFunction = (event) => {
    props.setSelectedEditUser({
      ...props.selectedEditUser,
      lastName: event.target.value,
    });
  };

  const firstNameFunction = (event) => {
    props.setSelectedEditUser({
      ...props.selectedEditUser,
      firstName: event.target.value,
    });
  };

  const emailFunction = (event) => {
    props.setSelectedEditUser({
      ...props.selectedEditUser,
      email: event.target.value,
    });
  };

  const phoneFunction = (event) => {
    props.setSelectedEditUser({
      ...props.selectedEditUser,
      phone: event.target.value,
    });
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
              <form
                className="popupForm"
                onSubmit={handleSubmit(() => submit())}
              >
                <div className="form-group popup">
                  <label>First Name: </label>
                  <input
                    type="text"
                    defaultValue={props.selectedEditUser?.firstName}
                    className="form-control firstName"
                    placeholder="Enter your first name"
                    aria-label="Firstname"
                    name="firstName"
                    {...register("firstName", { required: true })}
                    onChange={(event) => {
                      firstNameFunction(event);
                    }}
                  />
                  {/* {errors.firstName && (
                    <div className="validation">Please choose a username.</div>
                  )} */}
                </div>

                <div className="form-group popup">
                  <label>Last Name: </label>
                  <input
                    type="text"
                    defaultValue={props.selectedEditUser?.lastName}
                    className="form-control"
                    placeholder="Enter your last name"
                    name="lastName"
                    {...register("lastName", { required: true })}
                    onChange={(event) => {
                      lastNameFunction(event);
                    }}
                  />

                  {/* <div className="validation">
                    <p>{errors.lastName}Please, enter your last name.</p>
                  </div> */}

                  {/* {errors.lastName && (
                    <div className="validation">Please choose a username.</div>
                  )} */}
                </div>

                <div className="form-group popup">
                  <label>Email address: </label>
                  <input
                    type="text"
                    defaultValue={props.selectedEditUser?.email}
                    className="form-control"
                    placeholder="Enter your email"
                    name="email"
                    {...register("email", { required: true })}
                    onChange={(event) => {
                      emailFunction(event);
                    }}
                  />

                  {/* {errors.email && (
                    <div className="validation">Please choose a username.</div>
                  )} */}
                </div>

                <div className="form-group popup">
                  <label>Phone: </label>
                  <input
                    type="number"
                    defaultValue={props.selectedEditUser?.phone}
                    className="form-control"
                    placeholder="Enter your phone"
                    name="phone"
                    {...register("phone", { required: true })}
                    onChange={(event) => {
                      phoneFunction(event);
                    }}
                  />
                </div>
              </form>

              <div className="saveButtonContainer">
                <button
                  className="btn btn-primary saveButton"
                  onClick={() => addOrUpdateUser()}
                  type="submit"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Popup;
