import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, Slider } from "antd";
import { useForm } from "antd/lib/form/Form";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { base } from "../../base";
import { Layout, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Axios from "axios";

import S3 from "react-aws-s3";
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

  useEffect(() => {
    loadData(props.match.params.id);
  }, []);

  const loadData = async (id) => {
    if (props.match.params.id) {
      let url = `http://localhost:3001/slidermanagement/read/${id}`;
      await Axios.get(url).then((response) => {
        form.setFieldsValue(response.data);
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

  // const onChangeFirebase = (event) => {
  //   const file = event.file[0];
  //   const storageRef = base.storageRef().ref();
  //   const fileRef = storageRef.child(file.name);
  //   fileRef.put(file).then(() => {
  //   });
  // };

  const onChangeFile = (info) => {
    const nextState = {};
    switch (info.file.status) {
      case "uploading":
        nextState.selectedFileList = [info.file];
        break;

      case "done":
        nextState.selectedFile = info.file;
        nextState.selectedFileList = [info.file];

        break;

      default:
        // error or removed
        nextState.selectedFile = null;
        nextState.selectedFileList = [];
    }
    setState(nextState);
  };

  const dummyRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
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
          enctype="multipart/form-data"
          rules={[{ required: true, message: "Please input text" }]}
        >
          <Upload
            fileList={state.selectedFileList}
            customRequest={dummyRequest}
            onChange={onChangeFile}
            accept="image/*"
          >
            <Button>Choose File</Button>
          </Upload>
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
