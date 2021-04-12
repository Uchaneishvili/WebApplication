import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Modal, Input } from "antd";
import "./Popup.css";
import { useForm } from "antd/lib/form/Form";
function Popup(props) {
  const [popupEnable, setPopupEnable] = useState();

  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(props.car);
  }, [props.car]);

  useEffect(() => {
    setPopupEnable(props.modal);
  }, [props.modal]);

  const addOrUpdateCar = async () => {
    console.log(form.getFieldValue());
    const formValues = form.getFieldValue();
    await form.validateFields();

    if (props.car._id) {
      await axios.put("http://localhost:3001/cars/update", {
        _id: props.car._id,
        manufacturer: formValues.manufacturer,
        model: formValues.model,
      });
    } else {
      await axios.post("http://localhost:3001/cars/insert", {
        manufacturer: formValues.manufacturer,
        model: formValues.model,
      });
    }
    props.closePopup();
    form.resetFields();
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
        >
          <div className="modal-header">
            {props.car._id ? (
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
              form={form}
              {...layout}
              className="popupForm"
              wrapperCol={{ span: 15 }}
            >
              <Form.Item
                label="Manufacturer"
                name="manufacturer"
                rules={[
                  { required: true, message: "Please input Manufacturer" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Model"
                name="model"
                rules={[{ required: true, message: "Please input Model" }]}
              >
                <Input />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Popup;
