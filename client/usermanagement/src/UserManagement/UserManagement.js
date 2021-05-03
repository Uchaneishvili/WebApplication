import React from "react";
import UserTable from "./Components/UserTable.js";
import { Layout, Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

function UserManagement() {
  const { Header, Content } = Layout;

  return (
    <div>
      <div className="breadCrumb">
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item href="/">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item>User Management</Breadcrumb.Item>
        </Breadcrumb>

        <Header className="site-layout-background-title" style={{ padding: 0 }}>
          <b>User Management</b>
        </Header>
      </div>
      <UserTable />;
    </div>
  );
}

export default UserManagement;
