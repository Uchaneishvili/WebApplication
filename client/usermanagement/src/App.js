import "./App.css";
import React from "react";
import UserManagement from "./UserManagement/UserManagement";
import CarsManagement from "./CarsManagement/CarsManagement";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import Slider from "./Slider";
import Sidebar from "./Sidebar";

function App() {
  const { Header, Content } = Layout;

  return (
    <div>
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar />
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Header
              className="site-layout-background-header"
              style={{ padding: 0 }}
            />

            <Content style={{ margin: "0 16px" }}>
              <div className="content-container">
                <div
                  className="site-layout-background"
                  style={{ margin: "24px 16px 0", overflow: "initial" }}
                >
                  <Route path="/" exact component={Slider} />
                  <Route path="/UserManagement" component={UserManagement} />
                  <Route path="/CarsManagement" component={CarsManagement} />
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
