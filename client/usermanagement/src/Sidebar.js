import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  CarOutlined,
  SlidersOutlined,
} from "@ant-design/icons";

function Sidebar() {
  const { Sider } = Layout;

  const [collapsed, setCollapsed] = useState(false);

  const [selectedKeys, setSelectedKeys] = useState([""]);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const pathes = currentPath.split("/");
    if (pathes[1] === "") pathes[1] = "home";
    setSelectedKeys([pathes[1]]);
  }, [location]);

  useEffect(() => {
    return () => {
      setCollapsed(collapsed);
    };
  }, [collapsed]);

  return (
    <Sider
      collapsible
      onCollapse={() => setCollapsed(collapsed)}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" selectedKeys={selectedKeys} mode="inline">
        <Menu.Item className="" key="home" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>

        <Menu.Item key="UserManagement" icon={<UserOutlined />}>
          <Link to="/UserManagement">User Management</Link>
        </Menu.Item>

        <Menu.Item key="CarsManagement" icon={<CarOutlined />}>
          <Link to="/CarsManagement">Car Management</Link>
        </Menu.Item>
        <Menu.Item
          className=""
          key="SliderManagement"
          icon={<SlidersOutlined />}
        >
          <Link to="/SliderManagement">Slider Management</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export default Sidebar;
