import React from "react";
import CarsTable from "./Components/CarsTable.js";
import { Layout, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

function CarsManagement() {
  const { Header } = Layout;

  return (
    <div>
      <div className="breadCrumb">
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>Cars Management</Breadcrumb.Item>
        </Breadcrumb>

        <Header className="site-layout-background-title" style={{ padding: 0 }}>
          <b>Cars Management</b>
        </Header>
      </div>
      <CarsTable />
    </div>
  );
}

export default CarsManagement;
