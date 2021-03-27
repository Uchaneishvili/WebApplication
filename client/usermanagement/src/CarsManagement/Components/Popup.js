import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Form, Modal, Input } from "antd";
import "./Popup.css";

function Popup(props) {
  const { register, handleSubmit, errors } = useForm();
  const [popupEnable, setPopupEnable] = useState();
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);

  useEffect(() => {
    setPopupEnable(props.modal);

    console.log(props.modal);
  }, [props.modal]);

  const onSubmitInsert = () => {
    if (props.car.manufacturer != undefined && props.car.mode != undefined) {
      props.loadData(1);
      props.closePopup();
    }
  };

  const onSubmitupdate = () => {
    if (props.car.manufacturer != undefined && props.car.model != undefined) {
      props.loadData(1);
      props.closePopup();
    }
  };

  const onSubmit = () => {
    if (props.car.manufacturer && props.car.model) {
      props.loadData(1);
      props.closePopup();
      setButtonIsDisabled(false);
      console.log("onSubmit");
    } else if (
      props.car.manufacturer != undefined &&
      props.car.model != undefined
    ) {
      props.loadData(1);
      props.closePopup();
      setButtonIsDisabled(false);
      console.log("onSubmit");
    }
  };

  const addOrUpdateCar = async () => {
    if (props.car && props.car._id) {
      await axios.put("http://localhost:3001/cars/update", {
        _id: props.car._id,
        manufacturer: props.car.manufacturer,
        model: props.car.model,
      });
      onSubmitInsert();
      setButtonIsDisabled(true);
    } else {
      await axios.post("http://localhost:3001/cars/insert", {
        manufacturer: props.car.manufacturer,
        model: props.car.model,
      });
      onSubmitupdate();
      setButtonIsDisabled(true);
    }
  };

  const modelFunction = (event) => {
    props.setCar({
      ...props.car,
      model: event.target.value,
    });
    setButtonIsDisabled(false);
  };

  const manufacturerFunction = (event) => {
    props.setCar({
      ...props.car,
      manufacturer: event.target.value,
    });
    setButtonIsDisabled(true);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
    <div>
      <div>
        <Modal
          className="Modal"
          visible={popupEnable}
          onCancel={() => props.closePopup()}
          onOk={() => addOrUpdateCar()}
          okButtonProps={{ style: { buttonisdisabled: true } }} // Disabled
          cancelButtonProps={{ buttonIsDisabled: buttonIsDisabled }} // Disabled
        >
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
          </div>

          <div>
            <Form
              {...layout}
              className="popupForm"
              wrapperCol={{ span: 15 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Manufacturer"
                name="Manufacturer"
                rules={[
                  { required: true, message: "Please input Manufacturer" },
                ]}
              >
                <Input
                  onChange={(event) => {
                    manufacturerFunction(event);
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Model"
                name="Model"
                rules={[{ required: true, message: "Please input Model" }]}
              >
                <Input onChange={(event) => modelFunction(event)} />
              </Form.Item>

              {/* <div className="form-group popup">
                <label>Manufacturer </label>
                <input
                  type="text"
                  defaultValue={props.car?.manufacturer}
                  className="form-control manufacturer"
                  placeholder="Enter manufacturer of the car"
                  name="manufacturer"
                  ref={register({ required: true })}
                  onChange={(event) => {
                    manufacturerFunction(event);
                  }}
                />
                {errors.manufacturer && (
                  <div className="validation">
                    Please choose a manufacturer.
                  </div>
                )}
              </div> */}

              {/* <div className="form-group popup">
                <label>Model </label>
                <input
                  type="text"
                  defaultValue={props.car?.model}
                  className="form-control"
                  placeholder="Enter model of the car"
                  name="model"
                  ref={register({ required: true })}
                  onChange={(event) => modelFunction(event)}
                />
                {errors.model && (
                  <div className="validation">
                    Please choose a model of the car.
                  </div>
                )}
              </div> */}
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Popup;
