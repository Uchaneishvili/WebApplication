import React, { useEffect } from "react";
import { Form, Input, Button, Upload } from "antd";
import { useForm } from "antd/lib/form/Form";

import "./Detail.css";

function Detail() {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue();
  }, []);

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (value) => {
    console.log(value);
  };

  console.log("Detail");

  const props = {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange({ file, fileList }) {
      if (file.status !== "uploading") {
        console.log(file, fileList);
      }
    },
    defaultFileList: [
      {
        uid: "1",
        name: "xxx.png",
        status: "done",
        response: "Server Error 500", // custom error message to show
        url: "http://www.baidu.com/xxx.png",
      },
      {
        uid: "2",
        name: "yyy.png",
        status: "done",
        url: "http://www.baidu.com/yyy.png",
      },
      {
        uid: "3",
        name: "zzz.png",
        status: "error",
        response: "Server Error 500", // custom error message to show
        url: "http://www.baidu.com/zzz.png",
      },
    ],
  };

  return (
    <>
      <Button type="danger" className="cancelButton">
        Cancel
      </Button>
      <Form
        // form={form}
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
          rules={[{ required: true, message: "Please input name" }]}
        >
          {/* <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload> */}
          <Input className="inputField" />
        </Form.Item>

        <Form.Item className="saveBtn">
          <Button type="primary" className="saveButton">
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default Detail;
