import "./App.css";
import React, { useEffect, useState } from "react";
import UserManagement from "./UserManagement/UserManagement";
import CarsManagement from "./CarsManagement/CarsManagement";
import {
  BrowserRouter as Router,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { Layout, Menu, Breadcrumb } from "antd";
import { UserOutlined, HomeOutlined, CarOutlined } from "@ant-design/icons";
import Slider from "./Slider";

function App() {
  const { Header, Content, Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [menuItemTitle, setMenuItemTitle] = useState(false);
  let title = null;

  useEffect(() => {
    return () => {
      setCollapsed(collapsed);
    };
  }, [collapsed]);

  // useEffect(() => {
  //   console.log("home");

  //   setMenuItemTitle(menuItemTitle);
  // }, []);

  if (window.location.pathname == "/UserManagement") {
    title = "User Management";
  } else if (window.location.pathname == "/CarsManagement") {
    title = "Cars Management";
  } else if (window.location.pathname == "/Home") {
    title = "";
  }

  return (
    <div>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible onCollapse={() => setCollapsed(collapsed)}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item
                key="1"
                icon={<HomeOutlined />}
                // onClick={() => setMenuItemTitle(true)}
              >
                Home
                <Link to={"/"}></Link>
              </Menu.Item>

              <Menu.Item key="2" icon={<UserOutlined />}>
                User Management
                <Link to={"/UserManagement"}></Link>
              </Menu.Item>

              <Menu.Item key="9" icon={<CarOutlined />}>
                Car Management
                <Link to={"/CarsManagement"}></Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
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
                {title}
              </Header>

              <div className="content-container">
                <div
                  className="site-layout-background"
                  style={{ padding: 24, minHeight: 360 }}
                >
                  <pre>{JSON.stringify(menuItemTitle)}</pre>
                  <Route path="/" exact component={Slider} />
                  <Route path="/UserManagement" component={UserManagement} />
                  <Route path="/CarsManagement" component={CarsManagement} />
                </div>
              </div>

              <button onClick={() => console.log("test")}>test</button>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
