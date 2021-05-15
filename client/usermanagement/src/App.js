import "./App.css";
import React from "react";
import UserManagement from "./UserManagement/UserManagement";
import CarsManagement from "./CarsManagement/CarsManagement";
import SliderManagement from "./SliderManagement/SliderManagement";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout, Breadcrumb } from "antd";
import Detail from "./SliderManagement/Components/Detail";
import { HomeOutlined } from "@ant-design/icons";
import Slider from "./Slider";
import Sidebar from "./Sidebar";
import { Translation } from "react-i18next";

function App() {
  const { Header, Content } = Layout;

  return (
    <div>
      {/* <nav> */}
      {/* <button onClick={() => LanguageSelectorClick("en")}>English</button> */}
      {/* <button onClick={() => LanguageSelectorClick("ge")}>Georgian</button> */}
      {/* <button onClick={() => LanguageSelectorClick("ru")}>Russian</button> */}
      {/* </nav> */}
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
                  <Route
                    exact
                    path="/SliderManagement"
                    component={SliderManagement}
                  />
                  <Route
                    exact
                    path="/SliderManagement/edit/:id"
                    component={Detail}
                  />

                  <Route
                    component={Detail}
                    path={"/SliderManagement/addSlider"}
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
