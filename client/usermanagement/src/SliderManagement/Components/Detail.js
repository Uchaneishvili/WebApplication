import React, { useEffect } from "react";
import { Form, Input, Button, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import axios from "axios";

import "./Detail.css";

function Detail(props) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue(props.slider);
  }, [props.slider]);

  const addOrUpdateSlider = async () => {
    console.log(form.getFieldValue());
    console.log();

    const formValues = form.getFieldValue();
    await form.validateFields();

    if (props.slider && props.slider._id) {
      await axios.put(
        `http://localhost:3001//slidermanagement/edit/:id`,

        {
          _id: props.slider._id,
          name: formValues.name,
          image: formValues.image,
        }
      );
      console.log("Edit");
    } else if (props.slider && !props.slider._id) {
      await axios.post(
        `http://localhost:3001/slidermanagement/insert`,

        {
          name: formValues.name,
          image: formValues.image,
        }
      );
      console.log("Add Slider");
    }
    form.resetFields();
  };

  return (
    <>
      <Link to="/SliderManagement">
        <Button type="danger" className="cancelButton">
          Cancel
        </Button>
      </Link>
      <Form
        form={form}
        {...layout}
        wrapperCol={{ span: 15 }}
        className="popupForm"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name" }]}
        >
          <Input className="inputField" />
        </Form.Item>

        <Form.Item
          label="Image"
          name="image"
          className="uploadFile"
          rules={[{ required: true, message: "Please input text" }]}
        >
          {/* <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload> */}
          <Input className="inputField" />
        </Form.Item>

        <Form.Item className="saveBtn">
          <Button
            type="primary"
            className="saveButton"
            onClick={addOrUpdateSlider}
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Detail;
