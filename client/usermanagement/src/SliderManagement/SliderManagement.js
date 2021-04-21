import React from "react";
import { Table, Button } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Popconfirm, message } from "antd";
import Detail from "./Components/Detail";

function Dynamicform() {
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
      dataIndex: "action",
      render: (id) => (
        <div>
          <Link to={`SliderManagement/edit/:${id}`}>
            <Button>
              <EditOutlined />
            </Button>
          </Link>

          <Button>
            <Popconfirm
              title="Are you sure to delete this task?"
              onConfirm={confirm}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined />
            </Popconfirm>
          </Button>
        </div>
      ),
    },
  ];

  function confirm(e) {
    console.log(e);
    message.success("Successful");
  }

  const data = [];
  for (let i = 0; i < 46; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      image: 32,
    });
  }

  return (
    <div>
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
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
}

export default Dynamicform;
