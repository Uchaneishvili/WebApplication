import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Axios from "axios";
import axios from "axios";

import "./Detail.css";

function Detail(props) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const [form] = useForm();
  const { Header } = Layout;
  const [state, setState] = useState({
    selectedFile: null,
    selectedFileList: [],
  });
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    loadData(props.match.params.id);
  }, []);

  const loadData = async (id) => {
    if (props.match.params.id) {
      let url = `http://localhost:3001/slidermanagement/read/${id}`;
      await Axios.get(url).then((response) => {
        form.setFieldsValue(response.data);
        setSelectedImage(response.data.image);
      });
    } else {
    }
  };

  const addOrUpdateSlider = async () => {
    const formValues = form.getFieldValue();
    await form.validateFields();

    if (props.match.params.id) {
      await axios.put(
        `http://localhost:3001/slidermanagement/edit/${props.match.params.id}`,

        {
          _id: props.sliderId,
          name: formValues.name,
          image: formValues.image,
        }
      );
    } else {
      await axios.post(
        `http://localhost:3001/slidermanagement/insert`,

        {
          name: formValues.name,
          image: formValues.image,
        }
      );
    }

    form.resetFields();
  };

  return (
    <>
      <div className="breadCrumb">
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/SliderManagement">
            Slider Management
          </Breadcrumb.Item>
          {props.match.params.id ? (
            <Breadcrumb.Item>Edit Slider</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>Add Slider</Breadcrumb.Item>
          )}
        </Breadcrumb>

        <Header className="site-layout-background-title" style={{ padding: 0 }}>
          {props.match.params.id ? <b> Edit Slider</b> : <b> Add Slider</b>}
        </Header>
      </div>

      <Link to="/SliderManagement">
        <Button type="danger" className="cancelButton">
          Cancel
        </Button>
      </Link>
      <div></div>
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
          <Upload fileList={state.selectedFileList} accept="image/*">
            <div>Choose File</div>
          </Upload>
        </Form.Item>
        {JSON.stringify(selectedImage)}
        <img src="C:\fakepath\Untitled.png"></img>

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
