import React, { useState } from "react";
import Axios from "axios";
import Popup from "./Popup";
import Pagination from "./Pagination";
import Search from "./Search";
import PopupConfirm from "./PopupConfirm";
import "./CarsTable.css";
import { Table, Button } from "antd";

function CarsTable() {
  const [carsList, setCarsList] = useState();
  const [pages, setPages] = useState();
  const [car, setCar] = useState({});
  const [modal, setModal] = useState();
  const [confirmPopup, setConfirmPopup] = useState();
  const [carIdToDelete, setCarIdToDelete] = useState();
  const [sortObjectInCar, setSortObjectInCar] = useState({});

  const addCar = () => {
    setModal(true);
    setCar({});
  };

  const editCar = (car) => {
    setModal(true);
    setCar(car);
    console.log("editcar");
  };

  const loadData = async (page, search, sortField, sortDirection) => {
    let url = `http://localhost:3001/cars/read?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }

    if (sortField) {
      url += `&sortField=${sortField}&sortDirection=${sortDirection}`;
    }

    await Axios.get(url).then((response) => {
      setCarsList(response.data.data);
      setPages(response.data.pages);
    });
  };

  const deleteCar = async (id) => {
    await Axios.delete(`http://localhost:3001/cars/delete/${id}`);
    loadData();
    setConfirmPopup(false);
    console.log("test");
  };

  const closePopup = () => {
    setModal(false);
  };

  const openConfirmPopup = (id) => {
    setCarIdToDelete(id);
    setConfirmPopup(true);
  };

  const closeConfirmPopup = () => {
    setConfirmPopup(false);
  };

  const sortInCar = (sortField) => {
    if (!sortObjectInCar[sortField]) {
      setSortObjectInCar({ [sortField]: "asc" });
      loadData(1, "", sortField, "asc");
    } else {
      if (sortObjectInCar[sortField] == "asc") {
        setSortObjectInCar({ [sortField]: "desc" });
        loadData(1, "", sortField, "desc");
      } else {
        setSortObjectInCar({});
        loadData(1, "");
      }
    }
  };

  const tableHead = [
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      // sorter: ,
    },
    {
      title: "Model",
      dataIndex: "model",
      sorter: () => {
        loadData(1, "", "model", "asc");
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      render: (id, car) => (
        <div>
          <Button
            type="danger"
            className="deleteCarButton"
            onClick={() => openConfirmPopup(id)}
          >
            Delete
          </Button>
          <Button
            type="primary"
            className="updateCarButton"
            onClick={() => {
              editCar(car);
            }}
          >
            Update
          </Button>
        </div>
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    console.log({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  return (
    <div className="container">
      <pre>{JSON.stringify(car)}</pre>

      <div className="SearchAndAddUserContainer">
        <div className="centerButtonContainer">
          <Button type="primary" size="large" onClick={addCar}>
            Add Car
          </Button>
        </div>
        <Search loadData={loadData} />
      </div>
      <Table
        dataSource={carsList}
        columns={tableHead}
        pagination={false}
        onChange={handleTableChange}
        rowKey={(car) => car._id}
      />

      {/* <thead>
          <tr>
            <th>
              Manufacturer{" "}
              <span onClick={() => sortInCar("manufacturer")}>
                {iconRenderer("manufacturer")}
              </span>
            </th>

            <th>
              Model
              <span onClick={() => sortInCar("model")}>
                {iconRenderer("model")}
              </span>
            </th>
            <th>Action</th>
          </tr>
        </thead> */}

      {/* {carsList &&
        carsList.map((val) => {
          return (
            <tbody key={val._id}>
              <tr>
                <td scope="col" className="manufacturer" id="Manufacturer">
                  {val.manufacturer}
                </td>
                <td scope="col" className="model" id="Model">
                  {val.model}
                </td>
                <td scope="col" className="buttonsContainer" id="Action">
                  <button
                    className="btn btn-danger deteleTableButton"
                    onClick={() => openConfirmPopup(val._id)}
                  >
                    delete
                  </button>
                  <button
                    className="btn btn-success updateTableButton"
                    onClick={() => editCar(val)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })} */}
      <Pagination
        totalPages={pages}
        loadData={loadData}
        carsList={carsList}
        setCarsList={setCarsList}
      />
      <Popup
        modal={modal}
        car={car}
        loadData={loadData}
        closePopup={closePopup}
        setCar={setCar}
      />
      <PopupConfirm
        deleteCar={deleteCar}
        confirmPopup={confirmPopup}
        closeConfirmPopup={closeConfirmPopup}
        carIdToDelete={carIdToDelete}
      />
    </div>
  );
}

export default CarsTable;
