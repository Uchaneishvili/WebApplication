import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import axios from "axios";

function Popup(props) {
  const { register, handleSubmit, errors } = useForm();
  const [popupEnable, setPopupEnable] = useState();

  useEffect(() => {
    setPopupEnable(props.modal);

    console.log(props.modal);
  }, [props.modal]);

  const onSubmit = () => {
    if (props.car.Manufacturer && props.car.Model) {
      setPopupEnable(false);
    }
  };

  const closeButton = () => {
    setPopupEnable(false);
  };

  const addOrUpdateCar = async () => {
    if (props.car && props.car._id) {
      await axios.put("http://localhost:3001/cars/update", {
        _id: props.car._id,
        manufacturer: props.car.Manufacturer,
        model: props.car.Model,
      });
    } else {
      await axios.post("http://localhost:3001/cars/insert", {
        manufacturer: props.car.Manufacturer,
        model: props.car.Model,
      });
    }
    props.loadData();
  };

  return (
    <div>
      <div>
        <Modal className="Modal" ariaHideApp={false} isOpen={popupEnable}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                {props.car && props.car._id ? (
                  <h5 className="modal-title" id="exampleModalLabel">
                    Update Car's Information
                  </h5>
                ) : (
                  <h5 className="modal=title" id="exampleModalLabel1">
                    Add Car
                  </h5>
                )}
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() => closeButton()}
                >
                  X
                </button>
              </div>

              <div>
                <form className="popupForm" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group popup">
                    <label>Manufacturer </label>
                    <input
                      type="text"
                      defaultValue={props.car?.Manufacturer}
                      className="form-control manufacturer"
                      placeholder="Enter manufacturer of the car"
                      name="manufacturer"
                      ref={register({ required: true })}
                      onChange={(event) => {
                        props.setCar({
                          ...props.car,
                          Manufacturer: event.target.value,
                        });
                      }}
                    />
                    {errors.manufacturer && (
                      <div className="validation">
                        Please choose a manufacturer.
                      </div>
                    )}
                  </div>

                  <div className="form-group popup">
                    <label>Model </label>
                    <input
                      type="text"
                      defaultValue={props.car?.Model}
                      className="form-control"
                      placeholder="Enter model of the car"
                      name="model"
                      ref={register({ required: true })}
                      onChange={(event) => {
                        props.setCar({
                          ...props.car,
                          Model: event.target.value,
                        });
                      }}
                    />
                    {errors.model && (
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
                      onClick={() => closeButton()}
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-primary saveButton"
                      onClick={() => addOrUpdateCar()}
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
  );
}

export default Popup;
