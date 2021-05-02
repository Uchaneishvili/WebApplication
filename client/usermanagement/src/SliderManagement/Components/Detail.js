import React, { useEffect } from "react";
import { Form, Input, Button, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import Axios from "axios";

// import { aws } from "../../keys";
import S3 from "react-aws-s3";
import axios from "axios";

import "./Detail.css";

const config = {
  bucketName: "SliderImage",
  dirName: "photos",
  region: "eu-west-1",
  // accessKeyId: aws.accessKeyId,
  // secretAccessKey: aws.secretAccessKey,
};

function Detail(props) {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const [form] = useForm();

  useEffect(() => {
    console.log(props.match.params.id);
    loadData(props.match.params.id);
  }, []);

  const loadData = async (id) => {
    let url = `http://localhost:3001/slidermanagement/read/${id}`;
    await Axios.get(url).then((response) => {
      form.setFieldsValue(response.data);
    });
  };

  const addOrUpdateSlider = async () => {
    console.log(form.getFieldValue());
    const formValues = form.getFieldValue();
    await form.validateFields();

    // if (props.slider) {
    // await axios.put(
    //   `http://localhost:3001//slidermanagement/edit/${props.sliderId}`,

    //   {
    //     _id: props.sliderId,
    //     name: formValues.name,
    //     image: formValues.image,
    //   }
    // );
    // } else {
    await axios.post(
      `http://localhost:3001/slidermanagement/insert`,

      {
        name: formValues.name,
        image: formValues.image,
      }
    );
    console.log("Add Slider");
    // }

    form.resetFields();
  };

  const uploadImageFile = (e) => {
    console.log(e);
    // S3.upload(e.target.files[0], config)
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  return (
    <>
      <Link to="/SliderManagement">
        <Button type="danger" className="cancelButton">
          Cancel
        </Button>
      </Link>
      <div>
        {/* {props.slider._id  ? <h5>Edit Slider</h5> : <h5>Add Slider</h5>} */}
      </div>
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
          name="image"
          label="Image"
          className="uploadFile"
          rules={[{ required: true, message: "Please input text" }]}
        >
          {/* <Upload {...test}>
            <Button icon={<UploadOutlined />} onChange={uploadImageFile()}>
              Upload
            </Button>
          </Upload> */}

          <Input
            type="file"
            className="inputFileField"
            onChange={uploadImageFile}
          />
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
