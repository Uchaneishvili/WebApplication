import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Popconfirm, message } from "antd";
import Axios from "axios";
import Detail from "./Components/Detail";
import "./SliderManagement.css";

function Dynamicform() {
  const [slider, setSlider] = useState({});
  const [sliderList, setSliderList] = useState();
  const selectedRowKeys = [];
  const rowSelection = {
    selectedRowKeys,
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
          <Link to={`SliderManagement/edit/:${id}`}>
            <Button onClick={() => editSlider(slider)}>
              <EditOutlined />
            </Button>
          </Link>

          <Button>
            <Popconfirm
              title="Are you sure to delete this task?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => deleteSlider(id)}
            >
              <DeleteOutlined />
            </Popconfirm>
          </Button>
        </div>
      ),
    },
  ];

  const loadData = async () => {
    let url = `http://localhost:3001/slidermanagement/read`;
    await Axios.get(url).then((response) => {
      setSliderList(response.data);
      console.log(response.data);
    });
  };

  const editSlider = (slider) => {
    setSlider(slider);
    console.log("editSlider");
    console.log(slider);
  };

  const deleteSlider = async (id) => {
    await Axios.delete(`http://localhost:3001/slidermanagement/delete/${id}`);
    loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  console.log(slider);
  return (
    <div>
      <pre>{JSON.stringify(slider)}</pre>

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
              <Button type="primary" icon={<PlusOutlined />}>
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
      <div className="test">
        <Detail slider={slider} />
      </div>
    </div>
  );
}

export default Dynamicform;
