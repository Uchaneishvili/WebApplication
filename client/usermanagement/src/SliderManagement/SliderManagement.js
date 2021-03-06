import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Popconfirm, message } from "antd";
import { Layout, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import Axios from "axios";
import Detail from "./Components/Detail";
import "./SliderManagement.css";

function SliderManagement() {
  const [slider, setSlider] = useState({});
  const [sliderList, setSliderList] = useState();
  const selectedRowKeys = [];
  const rowSelection = {
    selectedRowKeys,
  };
  const { Header } = Layout;

  const editSlider = (slider) => {
    setSlider(slider);
  };

  useEffect(() => {}, [slider]);

  const addSlider = () => {
    setSlider({});
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, slider) => (
        <div>
          <Link to={`SliderManagement/edit/${id}`}>
            <Button onClick={() => editSlider(slider)}>
              <EditOutlined />
            </Button>
          </Link>

          {/* <Button> */}
          <Popconfirm
            placement="topLeft"
            title="Are you sure to delete the slider?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteSlider(slider._id)}
          >
            <Button>
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const loadData = async () => {
    let url = `http://localhost:3001/slidermanagement/read`;
    await Axios.get(url).then((response) => {
      setSliderList(response.data);
    });
  };

  const deleteSlider = async (id) => {
    await Axios.delete(`http://localhost:3001/slidermanagement/delete/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div className="breadCrumb">
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Slider Management</Breadcrumb.Item>
        </Breadcrumb>

        <Header className="site-layout-background-title" style={{ padding: 0 }}>
          <b>Slider Management</b>
        </Header>
      </div>

      <div>
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              float: "right",
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            <Link to={"SliderManagement/addSlider"}>
              <Button
                type="primary"
                onClick={addSlider}
                icon={<PlusOutlined />}
              >
                Add Slider
              </Button>
            </Link>
          </div>
        </div>
        <Table
          className="sliderTable"
          rowSelection={rowSelection}
          columns={columns}
          dataSource={sliderList}
          pagination={false}
          rowKey={(slider) => slider._id}
        />
      </div>
    </div>
  );
}

export default SliderManagement;
