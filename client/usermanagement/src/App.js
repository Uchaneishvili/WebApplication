import "./App.css";
import React, { useEffect, useState } from "react";
import UserManagement from "./UserManagement/UserManagement";
import CarsManagement from "./CarsManagement/CarsManagement";
import SliderManagement from "./SliderManagement/SliderManagement";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import {
  UserOutlined,
  HomeOutlined,
  CarOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import Slider from "./Slider";

function App() {
  const { Header, Content, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  let title = null;

  useEffect(() => {
    return () => {
      setCollapsed(collapsed);
    };
  }, [collapsed]);

  if (window.location.pathname == "/UserManagement") {
    title = "User Management";
  } else if (window.location.pathname == "/CarsManagement") {
    title = "Cars Management";
  } else if (window.location.pathname == "/Home") {
    title = "";
  } else if (window.location.pathname == "/SliderManagement") {
    title = "Slider Management";
  }

  const changeClassname = () => {
    document.getElementsByClassName("");
  };

  console.log(window.location.pathname);
  return (
    <div>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
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
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item
                className=""
                key="1"
                icon={<HomeOutlined />}
                onClick={() => {
                  window.location.pathname = "/";
                }}
              >
                Home
                <Link to={"/"}></Link>
              </Menu.Item>

              <Menu.Item
                key="2"
                icon={<UserOutlined />}
                onClick={() => {
                  window.location.pathname = "/UserManagement";
                }}
              >
                User Management
              </Menu.Item>

              <Menu.Item
                key="3"
                icon={<CarOutlined />}
                onClick={() => {
                  window.location.pathname = "/CarsManagement";
                }}
              >
                Car Management
              </Menu.Item>
              <Menu.Item
                className=""
                key="4"
                icon={<SlidersOutlined />}
                onClick={() => {
                  window.location.pathname = "/SliderManagement";
                }}
              >
                Slider Management
                <Link to={"/SliderManagement"}></Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header
              className="site-layout-background-header"
              style={{ padding: 0 }}
            />

            <Content style={{ margin: "0 16px" }}>
              <div className="breadCrumb">
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item href="/">
                    <HomeOutlined />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <Header
                className="site-layout-background-title"
                style={{ padding: 0 }}
              >
                <b>{title}</b>
              </Header>

              <div className="content-container">
                <div
                  className="site-layout-background"
                  style={{ margin: "24px 16px 0", overflow: "initial" }}
                >
                  <Route path="/" exact component={Slider} />
                  <Route path="/UserManagement" component={UserManagement} />
                  <Route path="/CarsManagement" component={CarsManagement} />
                  <Route
                    path="/SliderManagement"
                    exact
                    component={SliderManagement}
                  />
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
